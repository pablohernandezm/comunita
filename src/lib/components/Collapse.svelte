<script>
    import{check} from "$lib/utils";

</script>

<div class="collapse flex-col bg-base-100 max-w-md p-6 rounded-2xl gap-4">
    <input type="checkbox" name="settings" class="cursor-pointer h-4" use:check checked/>

    <div class="collapse-title overflow-hidden flex gap-1 sm:justify-between sm:flex-row-reverse items-center">
        <slot name="title"/>
    </div>
    <div class="collapse-content">
        <slot name="content"/>
    </div>
</div>