<script>
    import{check} from "$lib/utils";
    export let checked=false;
</script>

<div class="collapse flex-col bg-base-100 p-6 rounded-2xl w-full">
    <input type="checkbox" name="settings" class="cursor-pointer h-4" use:check {checked}/>

    <div class="collapse-title overflow-hidden flex gap-1 sm:justify-between sm:flex-row-reverse items-center">
        <slot name="title"/>
    </div>
    <div class="collapse-content">
        <slot name="content"/>
    </div>
</div>