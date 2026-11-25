import { useRef, useState } from 'react';
import { usePlayer } from '../../player/playerStore';
import { backupFileName, parseBackup, type ParsedBackup } from '../../save/backup';

// Save progress to a file / load it back. For shared tablets where the
// browser's storage gets cleared between lessons.

export function ExportSaveButton() {
  const [done, setDone] = useState(false);
  const save = () => {
    const backup = usePlayer.getState().exportCurrent();
    if (!backup) return;
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = backupFileName(backup.player);
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDone(true);
  };
  return (
    <>
      <button className="btn btn-soft" onClick={save}>💾 Save my progress to a file</button>
      {done && <p className="muted small">Saved! Keep the file somewhere safe, like your school drive.</p>}
    </>
  );
}

export function ImportSaveButton({ label = '📂 Load a save file' }: { label?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<Extract<ParsedBackup, { ok: true }> | null>(null);
  const [error, setError] = useState('');
  const players = usePlayer((s) => s.players);

  const onFile = async (file: File | undefined) => {
    setError('');
    setPending(null);
    if (!file) return;
    const result = parseBackup(await file.text());
    if (result.ok) setPending(result);
    else setError(result.reason);
    if (input.current) input.current.value = '';
  };

  const load = () => {
    if (!pending) return;
    usePlayer.getState().importSave(pending.player, pending.saves);
    window.location.reload();
  };

  const replaces = pending && players.some((p) => p.id === pending.player.id);

  return (
    <>
      <input ref={input} type="file" accept=".json,application/json" hidden onChange={(e) => onFile(e.target.files?.[0])} />
      {pending ? (
        <div className="confirm-row">
          <span>
            Load <b>{pending.player.nickname}</b>?
            {replaces && ' The progress on this device will be replaced by the file.'}
          </span>
          <button className="btn btn-primary" onClick={load}>Yes, load it</button>
          <button className="btn btn-soft" onClick={() => setPending(null)}>Cancel</button>
        </div>
      ) : (
        <button className="btn btn-soft" onClick={() => input.current?.click()}>{label}</button>
      )}
      {error && <p className="small error">{error}</p>}
    </>
  );
}
