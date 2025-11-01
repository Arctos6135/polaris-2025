import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import git from 'git-rev-sync';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__GIT_COMMIT__: JSON.stringify(git.short('./'))
	}
});
