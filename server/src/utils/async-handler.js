export function asyncHandle(handleFn) {
  return async function (req, res, next) {
    try {
      await handleFn(req, res)
    } catch (e) {
      next(e)
    }
  }
}
