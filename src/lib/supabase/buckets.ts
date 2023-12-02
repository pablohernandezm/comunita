import type {SupabaseClient} from "@supabase/supabase-js";
import type {Database} from "$lib/database.types";

export async function uploadFile(bucketName:string, filePath:string, file:File, supabase:SupabaseClient<Database>, upsert=true){
    const {error:imageError} = await supabase.storage.from(bucketName).upload(filePath, file, {upsert})
    console.error(imageError);
    return !imageError;
}

export async function deleteFile(bucketName:string, filePaths:string[], supabase:SupabaseClient<Database>) {
    const {error:fileError} = await supabase.storage.from(bucketName).remove(filePaths);

    return !fileError;


}

interface Dir{
    bucket: string
    path: string
}
export async function deleteFiles(dir:Dir[], supabase:SupabaseClient<Database>){
    for (const fileInfo of dir){
        await deleteFile(fileInfo.bucket, [fileInfo.path], supabase)
    }
}