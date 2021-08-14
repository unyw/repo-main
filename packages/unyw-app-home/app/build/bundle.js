
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                if (info.blocks[i] === block) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
                if (!info.hasCatch) {
                    throw error;
                }
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* ../../npmlibs/unyw-ui/src/Bottombar.svelte generated by Svelte v3.42.1 */

    const { Object: Object_1$1 } = globals;
    const file$3 = "../../npmlibs/unyw-ui/src/Bottombar.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (8:4) {#each Object.keys(tabs) as tab}
    function create_each_block$1(ctx) {
    	let div;
    	let i;
    	let i_class_value;
    	let t0;
    	let p;
    	let t1_value = /*tabs*/ ctx[1][/*tab*/ ctx[3]].label + "";
    	let t1;
    	let t2;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[2](/*tab*/ ctx[3]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			i = element("i");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(i, "class", i_class_value = "" + (null_to_empty(/*tabs*/ ctx[1][/*tab*/ ctx[3]].icon) + " svelte-zd2vxj"));
    			add_location(i, file$3, 9, 6, 237);
    			attr_dev(p, "class", "svelte-zd2vxj");
    			add_location(p, file$3, 10, 6, 271);
    			attr_dev(div, "class", "svelte-zd2vxj");
    			toggle_class(div, "active", /*tab*/ ctx[3] == /*active*/ ctx[0]);
    			add_location(div, file$3, 8, 4, 166);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, i);
    			append_dev(div, t0);
    			append_dev(div, p);
    			append_dev(p, t1);
    			append_dev(div, t2);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*tabs*/ 2 && i_class_value !== (i_class_value = "" + (null_to_empty(/*tabs*/ ctx[1][/*tab*/ ctx[3]].icon) + " svelte-zd2vxj"))) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (dirty & /*tabs*/ 2 && t1_value !== (t1_value = /*tabs*/ ctx[1][/*tab*/ ctx[3]].label + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*Object, tabs, active*/ 3) {
    				toggle_class(div, "active", /*tab*/ ctx[3] == /*active*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(8:4) {#each Object.keys(tabs) as tab}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let each_value = Object.keys(/*tabs*/ ctx[1]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "container svelte-zd2vxj");
    			add_location(div0, file$3, 6, 2, 101);
    			attr_dev(div1, "class", "unywui-bottombar svelte-zd2vxj");
    			add_location(div1, file$3, 5, 0, 68);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Object, tabs, active*/ 3) {
    				each_value = Object.keys(/*tabs*/ ctx[1]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Bottombar', slots, []);
    	let { tabs = {} } = $$props;
    	let { active = '' } = $$props;
    	const writable_props = ['tabs', 'active'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Bottombar> was created with unknown prop '${key}'`);
    	});

    	const click_handler = tab => $$invalidate(0, active = tab);

    	$$self.$$set = $$props => {
    		if ('tabs' in $$props) $$invalidate(1, tabs = $$props.tabs);
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    	};

    	$$self.$capture_state = () => ({ tabs, active });

    	$$self.$inject_state = $$props => {
    		if ('tabs' in $$props) $$invalidate(1, tabs = $$props.tabs);
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [active, tabs, click_handler];
    }

    class Bottombar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { tabs: 1, active: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bottombar",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get tabs() {
    		throw new Error("<Bottombar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabs(value) {
    		throw new Error("<Bottombar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<Bottombar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Bottombar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* ../../npmlibs/unyw-ui/src/Checkbox.svelte generated by Svelte v3.42.1 */

    const file$2 = "../../npmlibs/unyw-ui/src/Checkbox.svelte";

    function create_fragment$2(ctx) {
    	let label;
    	let input;
    	let t;
    	let span;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t = space();
    			span = element("span");
    			if (default_slot) default_slot.c();
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "class", "svelte-14b82ez");
    			add_location(input, file$2, 5, 2, 90);
    			attr_dev(span, "class", "svelte-14b82ez");
    			add_location(span, file$2, 6, 2, 139);
    			attr_dev(label, "class", "pure-material-checkbox svelte-14b82ez");
    			add_location(label, file$2, 4, 0, 49);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = /*checked*/ ctx[0];
    			append_dev(label, t);
    			append_dev(label, span);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[3]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Checkbox', slots, ['default']);
    	let { checked = false } = $$props;
    	const writable_props = ['checked'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Checkbox> was created with unknown prop '${key}'`);
    	});

    	function input_change_handler() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	$$self.$$set = $$props => {
    		if ('checked' in $$props) $$invalidate(0, checked = $$props.checked);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ checked });

    	$$self.$inject_state = $$props => {
    		if ('checked' in $$props) $$invalidate(0, checked = $$props.checked);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [checked, $$scope, slots, input_change_handler];
    }

    class Checkbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { checked: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Checkbox",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get checked() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const UNYW_IP = "192.168.1.5" ;
    let unyw = null;


    const postData = async (url = '', data = {}) => {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    };

    const fetchToken = async () => {
      return (await fetch('/UNYW_TOKEN_API.json').then( r => r.json())).token
    };

    const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));


    var Unyw = async ()  => {
      while(true){
        try{
          if(unyw == null){
            unyw = await (async() => {
              const token = UNYW_IP != 'localhost' ? 'debugapi' : await fetchToken();
              const api = {};
              const info = await postData(`http://${UNYW_IP}:12080/unyw/info?token=${token}`);
              Object.entries(info.api).forEach( ([module, functions]) => {
                api[module] = {};
                functions.forEach(fun => {
                  api[module][fun] = async (data) => postData(`http://${UNYW_IP}:12080/${module}/${fun}?token=${token}`, data);
                });
              });
              api['unyw']['info'] = async () => info;
              return api
            })();
          }
          return unyw
        }catch(e){
          console.log("error");
        }
        await wait(100);
      }

    };

    /* ../../npmlibs/unyw-ui/src/VncViewer.svelte generated by Svelte v3.42.1 */

    const { console: console_1$1 } = globals;
    const file$1 = "../../npmlibs/unyw-ui/src/VncViewer.svelte";

    function get_then_context(ctx) {
    	ctx[5] = ctx[8].vnc.token;
    	ctx[6] = ctx[8].vnc.width;
    	ctx[7] = ctx[8].vnc.height;
    }

    // (75:2) {:catch e}
    function create_catch_block$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Error";
    			add_location(p, file$1, 75, 4, 2264);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$1.name,
    		type: "catch",
    		source: "(75:2) {:catch e}",
    		ctx
    	});

    	return block;
    }

    // (44:2) {:then {vnc: {token, width, height}}}
    function create_then_block$1(ctx) {
    	get_then_context(ctx);
    	let iframe;
    	let iframe_srcdoc_value;

    	const block = {
    		c: function create() {
    			iframe = element("iframe");
    			attr_dev(iframe, "id", "lc-layout-vncviewer");
    			attr_dev(iframe, "title", "vncviewer");

    			attr_dev(iframe, "srcdoc", iframe_srcdoc_value = `
    <html>
    <${script} src='./novnc/novnc.min.js'></${script}>
    <style> 
      body { width:${/*width*/ ctx[6]}px; height:${/*height*/ ctx[7]}px; }
      body * { overflow: hidden !important;  background-color: ${/*background*/ ctx[0]} !important;}
      body > canvas { background-color: transparent !important;}
    </style>
    <body style='overflow: hidden; padding: 0; margin:0; background-color: ${/*background*/ ctx[0]};'>
      <${script}>
        window.onload = function(){
          console.log('onload')
          var vncConnection = new noVNC(
              document.body,
              'ws://${/*UNYW_IP*/ ctx[2]}:12081/websockify',
              {repeaterID: '',  shared: true,  credentials: { password: '${/*token*/ ctx[5]}' }, }
          )

          document.body.addEventListener('keydown',  (e) =>	vncConnection._keyboard._handleKeyDown(e)  )
          document.body.addEventListener('keyup',    (e) => vncConnection._keyboard._handleKeyUp(e)    )
          document.body.addEventListener('keypress', (e) => vncConnection._keyboard._handleKeyPress(e) )
          vncConnection.scaleViewport = true
          vncConnection.addEventListener('disconnect', () => setTimeout( () => location.reload(), 500));
          vncConnection.addEventListener('credentialsrequired', () => vncConnection.sendCredentials({ password: '${/*token*/ ctx[5]}' }));
        }
      </${script}>
    </html> `);

    			attr_dev(iframe, "class", "svelte-zuad0b");
    			add_location(iframe, file$1, 45, 4, 831);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, iframe, anchor);
    		},
    		p: function update(ctx, dirty) {
    			get_then_context(ctx);

    			if (dirty & /*background*/ 1 && iframe_srcdoc_value !== (iframe_srcdoc_value = `
    <html>
    <${script} src='./novnc/novnc.min.js'></${script}>
    <style> 
      body { width:${/*width*/ ctx[6]}px; height:${/*height*/ ctx[7]}px; }
      body * { overflow: hidden !important;  background-color: ${/*background*/ ctx[0]} !important;}
      body > canvas { background-color: transparent !important;}
    </style>
    <body style='overflow: hidden; padding: 0; margin:0; background-color: ${/*background*/ ctx[0]};'>
      <${script}>
        window.onload = function(){
          console.log('onload')
          var vncConnection = new noVNC(
              document.body,
              'ws://${/*UNYW_IP*/ ctx[2]}:12081/websockify',
              {repeaterID: '',  shared: true,  credentials: { password: '${/*token*/ ctx[5]}' }, }
          )

          document.body.addEventListener('keydown',  (e) =>	vncConnection._keyboard._handleKeyDown(e)  )
          document.body.addEventListener('keyup',    (e) => vncConnection._keyboard._handleKeyUp(e)    )
          document.body.addEventListener('keypress', (e) => vncConnection._keyboard._handleKeyPress(e) )
          vncConnection.scaleViewport = true
          vncConnection.addEventListener('disconnect', () => setTimeout( () => location.reload(), 500));
          vncConnection.addEventListener('credentialsrequired', () => vncConnection.sendCredentials({ password: '${/*token*/ ctx[5]}' }));
        }
      </${script}>
    </html> `)) {
    				attr_dev(iframe, "srcdoc", iframe_srcdoc_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(iframe);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$1.name,
    		type: "then",
    		source: "(44:2) {:then {vnc: {token, width, height}}}",
    		ctx
    	});

    	return block;
    }

    // (42:18)      <span style="display: none"/>   {:then {vnc: {token, width, height}}}
    function create_pending_block$1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			set_style(span, "display", "none");
    			add_location(span, file$1, 42, 4, 755);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$1.name,
    		type: "pending",
    		source: "(42:18)      <span style=\\\"display: none\\\"/>   {:then {vnc: {token, width, height}}}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block$1,
    		then: create_then_block$1,
    		catch: create_catch_block$1,
    		value: 8,
    		error: 9
    	};

    	handle_promise(/*vncInfo*/ ctx[3], info);

    	const block = {
    		c: function create() {
    			div = element("div");
    			info.block.c();
    			attr_dev(div, "class", "svelte-zuad0b");
    			add_location(div, file$1, 40, 0, 704);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			info.block.m(div, info.anchor = null);
    			info.mount = () => div;
    			info.anchor = null;
    			/*div_binding*/ ctx[4](div);
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			update_await_block_branch(info, ctx, dirty);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			info.block.d();
    			info.token = null;
    			info = null;
    			/*div_binding*/ ctx[4](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const script = 'script';

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('VncViewer', slots, []);
    	let { background = '#fff' } = $$props;
    	const UNYW_IP = "192.168.1.5" ;
    	let vncInfo = Unyw().then(unyw => unyw.unyw.info());
    	let vncIframe;

    	onMount(async () => {
    		const { process } = await Unyw();

    		console.log(await process.screen({
    			width: vncIframe.clientWidth,
    			height: vncIframe.clientHeight
    		}));

    		console.log(vncIframe.clientWidth, vncIframe.clientHeight);
    	});

    	const writable_props = ['background'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<VncViewer> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			vncIframe = $$value;
    			$$invalidate(1, vncIframe);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('background' in $$props) $$invalidate(0, background = $$props.background);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		Unyw,
    		background,
    		UNYW_IP,
    		script,
    		vncInfo,
    		vncIframe
    	});

    	$$self.$inject_state = $$props => {
    		if ('background' in $$props) $$invalidate(0, background = $$props.background);
    		if ('vncInfo' in $$props) $$invalidate(3, vncInfo = $$props.vncInfo);
    		if ('vncIframe' in $$props) $$invalidate(1, vncIframe = $$props.vncIframe);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [background, vncIframe, UNYW_IP, vncInfo, div_binding];
    }

    class VncViewer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { background: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VncViewer",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get background() {
    		throw new Error("<VncViewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set background(value) {
    		throw new Error("<VncViewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.42.1 */

    const { Object: Object_1, console: console_1 } = globals;
    const file = "src/App.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (85:33) 
    function create_if_block_3(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let checkbox;
    	let current;

    	checkbox = new Checkbox({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Settings";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Work in progress :)";
    			t3 = space();
    			create_component(checkbox.$$.fragment);
    			attr_dev(h1, "class", "svelte-16xjs7l");
    			add_location(h1, file, 86, 2, 2446);
    			add_location(p, file, 87, 2, 2466);
    			attr_dev(div, "class", "page page-settings svelte-16xjs7l");
    			add_location(div, file, 85, 1, 2411);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(div, t3);
    			mount_component(checkbox, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const checkbox_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				checkbox_changes.$$scope = { dirty, ctx };
    			}

    			checkbox.$set(checkbox_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(checkbox);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(85:33) ",
    		ctx
    	});

    	return block;
    }

    // (78:29) 
    function create_if_block_2(ctx) {
    	let div;
    	let select;
    	let option;
    	let t1;
    	let vncviewer;
    	let current;
    	vncviewer = new VncViewer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			select = element("select");
    			option = element("option");
    			option.textContent = "apk process";
    			t1 = space();
    			create_component(vncviewer.$$.fragment);
    			option.__value = "";
    			option.value = option.__value;
    			add_location(option, file, 80, 3, 2303);
    			add_location(select, file, 79, 2, 2291);
    			attr_dev(div, "class", "page page-logs svelte-16xjs7l");
    			add_location(div, file, 78, 1, 2260);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, select);
    			append_dev(select, option);
    			append_dev(div, t1);
    			mount_component(vncviewer, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(vncviewer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(vncviewer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(vncviewer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(78:29) ",
    		ctx
    	});

    	return block;
    }

    // (48:28) 
    function create_if_block_1(ctx) {
    	let div;
    	let button0;
    	let t0;
    	let i0;
    	let t1;
    	let button1;
    	let t2;
    	let i1;
    	let t3;
    	let button2;
    	let t4;
    	let i2;
    	let t5;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: false,
    		pending: create_pending_block_1,
    		then: create_then_block_1,
    		catch: create_catch_block_2,
    		value: 8
    	};

    	handle_promise(Unyw().then(func_2).then(func_3), info);

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			t0 = text("Edit repos ");
    			i0 = element("i");
    			t1 = space();
    			button1 = element("button");
    			t2 = text("Add keys ");
    			i1 = element("i");
    			t3 = space();
    			button2 = element("button");
    			t4 = text("Upgrade all ");
    			i2 = element("i");
    			t5 = space();
    			info.block.c();
    			attr_dev(i0, "class", "zmdi zmdi-edit");
    			add_location(i0, file, 49, 21, 1267);
    			attr_dev(button0, "class", "svelte-16xjs7l");
    			add_location(button0, file, 49, 2, 1248);
    			attr_dev(i1, "class", "zmdi zmdi-key");
    			add_location(i1, file, 50, 19, 1323);
    			attr_dev(button1, "class", "svelte-16xjs7l");
    			add_location(button1, file, 50, 2, 1306);
    			attr_dev(i2, "class", "zmdi zmdi-refresh-sync-alert");
    			add_location(i2, file, 51, 22, 1381);
    			attr_dev(button2, "class", "svelte-16xjs7l");
    			add_location(button2, file, 51, 2, 1361);
    			attr_dev(div, "class", "page page-add svelte-16xjs7l");
    			attr_dev(div, "id", "addid");
    			add_location(div, file, 48, 1, 1207);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(button0, t0);
    			append_dev(button0, i0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(button1, t2);
    			append_dev(button1, i1);
    			append_dev(div, t3);
    			append_dev(div, button2);
    			append_dev(button2, t4);
    			append_dev(button2, i2);
    			append_dev(div, t5);
    			info.block.m(div, info.anchor = null);
    			info.mount = () => div;
    			info.anchor = null;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			update_await_block_branch(info, ctx, dirty);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			info.block.d();
    			info.token = null;
    			info = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(48:28) ",
    		ctx
    	});

    	return block;
    }

    // (31:1) {#if active === 'apps'}
    function create_if_block(ctx) {
    	let div;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: false,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 1
    	};

    	handle_promise(Unyw().then(func).then(/*func_1*/ ctx[2]), info);

    	const block = {
    		c: function create() {
    			div = element("div");
    			info.block.c();
    			attr_dev(div, "class", "page page-apps svelte-16xjs7l");
    			add_location(div, file, 31, 1, 708);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			info.block.m(div, info.anchor = null);
    			info.mount = () => div;
    			info.anchor = null;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			update_await_block_branch(info, ctx, dirty);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			info.block.d();
    			info.token = null;
    			info = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(31:1) {#if active === 'apps'}",
    		ctx
    	});

    	return block;
    }

    // (89:2) <Checkbox>
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Debug mode");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(89:2) <Checkbox>",
    		ctx
    	});

    	return block;
    }

    // (1:0) <script>  import {Bottombar, Checkbox, VncViewer}
    function create_catch_block_2(ctx) {
    	const block = { c: noop, m: noop, p: noop, d: noop };

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block_2.name,
    		type: "catch",
    		source: "(1:0) <script>  import {Bottombar, Checkbox, VncViewer}",
    		ctx
    	});

    	return block;
    }

    // (57:2) {:then repos}
    function create_then_block_1(ctx) {
    	let each_1_anchor;
    	let each_value_1 = /*repos*/ ctx[8];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fetch, Unyw*/ 0) {
    				each_value_1 = /*repos*/ ctx[8];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block_1.name,
    		type: "then",
    		source: "(57:2) {:then repos}",
    		ctx
    	});

    	return block;
    }

    // (71:3) {:catch e}
    function create_catch_block_1(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = space();
    			attr_dev(span, "class", "hidden svelte-16xjs7l");
    			add_location(span, file, 71, 4, 2163);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block_1.name,
    		type: "catch",
    		source: "(71:3) {:catch e}",
    		ctx
    	});

    	return block;
    }

    // (61:3) {:then manifest}
    function create_then_block_2(ctx) {
    	let h3;
    	let t0_value = /*repo*/ ctx[9] + "";
    	let t0;
    	let hr;
    	let t1;
    	let t2;
    	let each_value_2 = /*manifest*/ ctx[12].apps;
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			t0 = text(t0_value);
    			hr = element("hr");
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			attr_dev(h3, "class", "svelte-16xjs7l");
    			add_location(h3, file, 61, 4, 1825);
    			add_location(hr, file, 61, 19, 1840);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			append_dev(h3, t0);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fetch, Unyw*/ 0) {
    				each_value_2 = /*manifest*/ ctx[12].apps;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t2.parentNode, t2);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block_2.name,
    		type: "then",
    		source: "(61:3) {:then manifest}",
    		ctx
    	});

    	return block;
    }

    // (63:4) {#each manifest.apps as app}
    function create_each_block_2(ctx) {
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let span;
    	let t1_value = /*app*/ ctx[5].replace('unyw-app-', '') + "";
    	let t1;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			span = element("span");
    			t1 = text(t1_value);
    			if (!src_url_equal(img.src, img_src_value = `${/*repo*/ ctx[9]}/icons/${/*app*/ ctx[5]}.png`)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", `Icon for ${/*app*/ ctx[5]}`);
    			attr_dev(img, "height", "40px");
    			add_location(img, file, 65, 6, 1960);
    			set_style(div0, "width", "60px");
    			set_style(div0, "height", "40px");
    			add_location(div0, file, 64, 5, 1915);
    			set_style(span, "font-size", "1rem");
    			add_location(span, file, 67, 5, 2054);
    			attr_dev(div1, "class", "app-container svelte-16xjs7l");
    			add_location(div1, file, 63, 4, 1882);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div1, t0);
    			append_dev(div1, span);
    			append_dev(span, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(63:4) {#each manifest.apps as app}",
    		ctx
    	});

    	return block;
    }

    // (59:63)      <span class="hidden"/>    {:then manifest}
    function create_pending_block_2(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = space();
    			attr_dev(span, "class", "hidden svelte-16xjs7l");
    			add_location(span, file, 59, 4, 1777);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block_2.name,
    		type: "pending",
    		source: "(59:63)      <span class=\\\"hidden\\\"/>    {:then manifest}",
    		ctx
    	});

    	return block;
    }

    // (58:3) {#each repos as repo}
    function create_each_block_1(ctx) {
    	let await_block_anchor;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block_2,
    		then: create_then_block_2,
    		catch: create_catch_block_1,
    		value: 12,
    		error: 15
    	};

    	handle_promise(fetch(`${/*repo*/ ctx[9]}/manifest.json`).then(func_4), info);

    	const block = {
    		c: function create() {
    			await_block_anchor = empty();
    			info.block.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, await_block_anchor, anchor);
    			info.block.m(target, info.anchor = anchor);
    			info.mount = () => await_block_anchor.parentNode;
    			info.anchor = await_block_anchor;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			update_await_block_branch(info, ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(await_block_anchor);
    			info.block.d(detaching);
    			info.token = null;
    			info = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(58:3) {#each repos as repo}",
    		ctx
    	});

    	return block;
    }

    // (55:122)      <span class="hidden"/>    {:then repos}
    function create_pending_block_1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "hidden svelte-16xjs7l");
    			add_location(span, file, 55, 4, 1643);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block_1.name,
    		type: "pending",
    		source: "(55:122)      <span class=\\\"hidden\\\"/>    {:then repos}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <script>  import {Bottombar, Checkbox, VncViewer}
    function create_catch_block(ctx) {
    	const block = { c: noop, m: noop, p: noop, d: noop };

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(1:0) <script>  import {Bottombar, Checkbox, VncViewer}",
    		ctx
    	});

    	return block;
    }

    // (37:2) {:then apps}
    function create_then_block(ctx) {
    	let each_1_anchor;
    	let each_value = /*apps*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*Unyw, Object*/ 0) {
    				each_value = /*apps*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(37:2) {:then apps}",
    		ctx
    	});

    	return block;
    }

    // (38:3) {#each apps as app}
    function create_each_block(ctx) {
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let span;
    	let t1_value = /*app*/ ctx[5] + "";
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			span = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			if (!src_url_equal(img.src, img_src_value = `/apps/${/*app*/ ctx[5]}/icon.png`)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", `Icon for ${/*app*/ ctx[5]}`);
    			attr_dev(img, "height", "40px");
    			add_location(img, file, 40, 5, 1006);
    			set_style(div0, "width", "60px");
    			set_style(div0, "height", "40px");
    			add_location(div0, file, 39, 4, 962);
    			set_style(span, "font-size", "1rem");
    			add_location(span, file, 42, 4, 1095);
    			attr_dev(div1, "class", "app-container svelte-16xjs7l");
    			add_location(div1, file, 38, 3, 930);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div1, t0);
    			append_dev(div1, span);
    			append_dev(span, t1);
    			append_dev(div1, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(38:3) {#each apps as app}",
    		ctx
    	});

    	return block;
    }

    // (35:41)      <span class="hidden"/>   {:then apps}
    function create_pending_block(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "hidden svelte-16xjs7l");
    			add_location(span, file, 35, 4, 865);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(35:41)      <span class=\\\"hidden\\\"/>   {:then apps}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let current_block_type_index;
    	let if_block;
    	let t;
    	let bottombar;
    	let updating_active;
    	let current;
    	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2, create_if_block_3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*active*/ ctx[0] === 'apps') return 0;
    		if (/*active*/ ctx[0] === 'add') return 1;
    		if (/*active*/ ctx[0] === 'logs') return 2;
    		if (/*active*/ ctx[0] === 'settings') return 3;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	function bottombar_active_binding(value) {
    		/*bottombar_active_binding*/ ctx[3](value);
    	}

    	let bottombar_props = {
    		tabs: {
    			'apps': { icon: 'zmdi zmdi-widgets', label: 'Apps' },
    			'add': {
    				icon: 'zmdi zmdi-download',
    				label: 'Add app'
    			},
    			'logs': { icon: 'zmdi zmdi-memory', label: 'Logs' },
    			'settings': {
    				icon: 'zmdi zmdi-settings',
    				label: 'Settings'
    			}
    		}
    	};

    	if (/*active*/ ctx[0] !== void 0) {
    		bottombar_props.active = /*active*/ ctx[0];
    	}

    	bottombar = new Bottombar({ props: bottombar_props, $$inline: true });
    	binding_callbacks.push(() => bind(bottombar, 'active', bottombar_active_binding));

    	const block = {
    		c: function create() {
    			main = element("main");
    			if (if_block) if_block.c();
    			t = space();
    			create_component(bottombar.$$.fragment);
    			attr_dev(main, "class", "svelte-16xjs7l");
    			add_location(main, file, 29, 0, 675);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(main, null);
    			}

    			append_dev(main, t);
    			mount_component(bottombar, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(main, t);
    				} else {
    					if_block = null;
    				}
    			}

    			const bottombar_changes = {};

    			if (!updating_active && dirty & /*active*/ 1) {
    				updating_active = true;
    				bottombar_changes.active = /*active*/ ctx[0];
    				add_flush_callback(() => updating_active = false);
    			}

    			bottombar.$set(bottombar_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(bottombar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(bottombar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			destroy_component(bottombar);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = ({ file }) => file.list({ path: '/usr/share/unyw/apps' });
    const func_2 = ({ file }) => file.read({ path: '/etc/apk/repositories' });
    const func_3 = ({ text }) => text.split('\n').filter(repo => repo && !repo.startsWith('https://dl-cdn.alpinelinux.org/alpine'));
    const func_4 = r => r.json();

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	const runCommand = command => Unyw().then(async ({ file, process }) => {
    		const files = await file.list({ path: "/run/unyw" });
    		console.log(files);
    		process.screen({ socket: "home-apk", command: "" });
    		file.list({ path: '/' });
    	});

    	const apps = {
    		'a': { icon: 'favicon.png', label: 'xterm' },
    		'b': { icon: 'favicon.png', label: 'firefox' },
    		'c': { icon: 'favicon.png', label: 'remote' },
    		'd': { icon: 'favicon.png', label: 'vscode' },
    		'e': { icon: 'favicon.png', label: 'gimp' },
    		'f': {
    			icon: 'favicon.png',
    			label: 'libreoffice'
    		}
    	};

    	let active = 'apps';
    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const func_1 = ({ list }) => Object.keys(list);

    	function bottombar_active_binding(value) {
    		active = value;
    		$$invalidate(0, active);
    	}

    	$$self.$capture_state = () => ({
    		Bottombar,
    		Checkbox,
    		VncViewer,
    		Unyw,
    		runCommand,
    		apps,
    		active
    	});

    	$$self.$inject_state = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [active, apps, func_1, bottombar_active_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
