<script>
    import Router from 'svelte-spa-router'   
	import Navbar from './lib/components/Navbar.svelte';
	import Home from './routes/Home.svelte';

	const routes = {
		'/': Home,
	}

</script>

<main>
	<Navbar />
	<Router {routes} />
</main>