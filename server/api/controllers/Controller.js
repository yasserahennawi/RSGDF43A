export default class Controller {
  successResponse(res, json) {
    return res.status(200).json(json);
  }
}
