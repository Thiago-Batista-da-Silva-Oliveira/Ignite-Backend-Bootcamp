import { IStorageProvider } from "../IStorageProvider";
import fs from "fs";
import { resolve } from "path";
import upload from "@config/upload";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`);

    try {
      await fs.promises.stat(filename);
    } catch (err) {
      return;
    }
  }
}

export { LocalStorageProvider };
