import type {PageLoad} from './$types'
export const load:PageLoad = async ({ parent, data:serverData }) => {
    const data = await parent();

    return {
        supabase: data.supabase,
        ...serverData
    }
}