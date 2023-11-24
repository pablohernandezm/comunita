<script lang="ts">
    import Logo from "$lib/components/Logo.svelte";

    let isLogin = true;

    const toggleAction = () =>{
        isLogin = !isLogin;
    }
</script>

<svelte:head>
    <title>Acceder</title>
</svelte:head>

<main class="flex justify-center w-full h-full items-center min-h-screen">
    <div class="flex flex-col w-fit h-fit items-center gap-2 bg-white py-8 px-8 rounded-xl">
        <Logo/>

        <div class="text-center flex flex-col gap-2">
            <h1 class="font-bold text-3xl text-gray-900">Bienvenido</h1>
            <p>Ingresa a comunicate para continuar</p>

            <form method="post" class="flex flex-col gap-2">
            {#if !isLogin}
                <input type="text" name="full_name" aria-label="full_name" class="brand-input" placeholder="Nombre completo">
            {/if}
                <input type="text" name="email" aria-label="email" class="brand-input" placeholder="Correo electrónico">
                <input type="password" name="" aria-label="email" class="brand-input" placeholder="Contraseña">

                <button type="submit" class="brand-btn">Continuar</button>
            </form>

            <p class="py-2">¿No tienes una cuenta?
                <button class="text-btn focus:underline outline-none hover:underline" on:click={toggleAction}>
                    {#if isLogin}
                        regístrate
                    {:else}
                        inicia sesión
                    {/if}
                </button>
            </p>
        </div>
    </div>
</main>