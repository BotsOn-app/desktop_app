<script>
    const showModal = () => {
        window.api.showModal();
    }
</script>
<div>
    <button on:click={showModal}>Show current modal</button>
</div>

<style>
    button {
       background: #ff1616; 
    }
</style>