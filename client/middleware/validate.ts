import { NextHandler } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

type RequestLocation = "query" | "body" | "params";

export const validate = (
    location: RequestLocation,
    schema: OptionalObjectSchema<ObjectShape>
) => {
    return async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: NextHandler
    ) => {
        let _location: any;
        switch (location) {
            case "query":
                _location = req.query;
                break;
            case "body":
                _location = req.body;
                break;
        }
        _location = await schema.validate(_location);
        next();
    };
};