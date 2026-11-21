// Local typing for `*.module.css` imports. Lives outside `src` so it is not
// published: consumers get this declaration from Next.js (`next-env.d.ts`).
declare module "*.module.css" {
  const classes: { readonly [key: string]: string }
  export default classes
}
