import fs from 'fs'

export const deleteFile = async(filename:string) => {
    try{
        await fs.promises.stat(filename) //verfica se existe
    }catch {
        return
    }
    await fs.promises.unlink(filename)
}