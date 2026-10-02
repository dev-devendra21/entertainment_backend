import blacklistTokenModel from "../models/schema/blacklistTokenModel.js";

const exists = (token) => blacklistTokenModel.exists({ token });

const create = (token) => blacklistTokenModel.create({ token });

export default { exists, create };
