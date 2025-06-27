<script>
    export let visible = false;
    export let message = "Loading...";
    export let fullscreen = false;
    export let bgOpacity = 0.7;
</script>

{#if visible}
    <div 
        class="loading-overlay" 
        class:fullscreen
        style="--bg-opacity: {bgOpacity};"
    >
        <div class="spinner-container">
            <div class="spinner"></div>
            {#if message}
                <p class="message">{message}</p>
            {/if}
        </div>
    </div>
{/if}

<style>
    .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, var(--bg-opacity));
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1400;
    }

    .fullscreen {
        position: fixed;
    }

    .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #ffffff;
        animation: spin 1s ease-in-out infinite;
    }

    .message {
        margin-top: 16px;
        color: white;
        font-size: 16px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style>