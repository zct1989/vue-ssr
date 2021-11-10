import { SSRContext } from '../../types';

export default function ({ app, router }: SSRContext) {
  console.log(app, router);
}
