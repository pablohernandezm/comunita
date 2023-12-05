<script lang="ts">
    import Logo from "$lib/components/Logo.svelte";
    export let aria_label='Abre el modal';

    let dialog: HTMLDialogElement;

    $:if(dialog && !dialog.open){
        dialog.setAttribute('inert', 'true');
    }

    function handleOpen(){
        dialog.removeAttribute('inert');
        dialog.showModal();
    }

    function handleClose(){
        dialog.setAttribute('inert', 'true');
    }
</script>

<button type="button" class="w-full bg-base-100  rounded-lg hover:scale-[101%] focus:scale-[101%]" aria-label={aria_label
} on:click={handleOpen}>
    <slot name="trigger"/>
</button>

<dialog bind:this={dialog} class="modal" on:close={handleClose}>

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
        <button tabindex="-1" class="cursor-default"/>
    </form>
</dialog>

