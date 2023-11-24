<script lang="ts">
    import Logo from "$lib/components/Logo.svelte";

    let dialog: HTMLDialogElement;
</script>

<button type="button" class="w-full bg-base-100 p-6  rounded-lg hover:scale-[101%] focus:scale-[101%]" on:click={()=>{dialog.showModal()}}>
    <slot name="trigger"/>
</button>

<dialog bind:this={dialog} class="modal">

    <div class="modal-box relative px-6 pt-12 max-w-sm w-[90%] max-h-[90%]">
        <div class="absolute top-2 left-2 p-2">
            <Logo size={30}></Logo>
        </div>

        <button class="absolute right-1 top-1 p-2 rounded-full hover:bg-rose-100" on:click={()=>{dialog.close()}}>
            <slot name="close"/>
        </button>

        <slot name="content"></slot>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button class="cursor-default"/>
    </form>
</dialog>

