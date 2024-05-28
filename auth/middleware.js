import { StatusCodes } from "http-status-codes";

function isOwner(req, res, next) {
    if (res.tokenData.title !== "owner")
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Access denied, Not Owner" });
  
        next();
}

function isWorker(req, res, next) {
  if (res.tokenData.title !== "worker")
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Access denied, Not Worker" });

  next();
}

function isWorkerOrOwnerOrCustomer(req, res, next) {
  const title = res.tokenData.title;
  if (title !== "owner" && title !== "customer" && title !== "worker")
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Access denied, Not Worker or Owner or Customer" });
  next();
}

function isCustomer(req, res, next) {
  if (res.tokenData.title !== "customer")
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Access denied, Not Customer" });

  next();
}

export { isWorker, isCustomer, isOwner, isWorkerOrOwnerOrCustomer };
