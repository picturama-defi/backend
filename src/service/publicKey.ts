import { ProjectOwner } from "../model";

export const addPublicKey = async (publicKey: string) => {
  let projectOwner = await ProjectOwner.findOne({
    publicKey,
  });
  if (projectOwner) {
    console.log("public key already exists");
  } else {
    projectOwner = new ProjectOwner({ publicKey });
    projectOwner.save().then(() => {
      console.log("added public key");
    });
  }
};
