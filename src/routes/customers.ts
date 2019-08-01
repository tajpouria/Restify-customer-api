import { Server } from "restify";
import errors from "restify-errors";

import Customer from "../models/customer";

export default (server: Server) => {
  server.get("/customers", async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.get("/customers/:id", async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);
      res.send(customer);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no resources by id ${req.params.id}`
        )
      );
    }
  });

  server.post("/customers", async (req, res, next) => {
    if (!req.is("application/json")) {
      return next(
        new errors.InvalidContentError("Provided Content should be JSON")
      );
    }

    const { name, surname, balance } = req.body;

    try {
      const customer = new Customer({ name, surname, balance });

      const newCustomer = await customer.save();
      next(newCustomer);
    } catch (err) {
      return next(new errors.InternalServerError(err));
    }
  });

  server.put("/customers/:id", async (req, res, next) => {
    if (!req.is("application/json")) {
      return next(
        new errors.InvalidContentError("Provided Content should be JSON")
      );
    }

    try {
      await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(201);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no resource by id : ${req.params.id}`
        )
      );
    }
  });

  server.del("/customers/:id", async (req, res, next) => {
    try {
      await Customer.findOneAndRemove({
        _id: req.params.id
      });
      res.send(204);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no resource by id : ${req.params.id}`
        )
      );
    }
  });
};
