import { ACTIVE_COURSE } from '../save/storage';
import { courseInfo } from './courses';

// The course (language being learned) for this page. Switching course reloads the page.
export { ACTIVE_COURSE };
export const COURSE = courseInfo(ACTIVE_COURSE);
