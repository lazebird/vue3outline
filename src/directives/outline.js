import { ref } from 'vue';

const OPTIONS = {
  subtree: true,
  childList: true,
  characterData: true,
};

function generateNavTree(dom, selectors, exceptSelector) {
  let list = [];
  if (exceptSelector) {
    let exceptList = dom.querySelectorAll(exceptSelector);
    exceptList.forEach((element) => {
      element.__nav_except = true;
    });
  }
  for (let idx in selectors) {
    let elementList = dom.querySelectorAll(selectors[idx]);
    elementList.forEach((element) => {
      if (element.__nav_except) return;
      element.__nav_level = idx;
    });
  }
  let selector = selectors.join(',');
  let domList = dom.querySelectorAll(selector);
  for (let element of domList) {
    if (!element.__nav_level) {
      delete element.__nav_except;
      continue;
    }
    let pushList = list;
    while (element.__nav_level > 0) {
      pushList = pushList.length ? pushList[pushList.length - 1].children : null;
      if (!pushList) break;
      element.__nav_level--;
    }
    let data = {
      title: element.textContent,
      children: [],
      el: element,
    };
    pushList && pushList.push(data);
    delete element.__nav_level;
  }
  return list;
}

const el = ref(null);
export default {
  created(e, binding, vNode) {
    console.log('[outline] e %s', JSON.stringify(e));
    el.value = e;
    let freeze = false;
    el.value.__generateNav = () => {
      if (freeze) return;
      window.requestAnimationFrame(() => {
        let selectors = binding.value.selectors || ['h1', 'h2'];
        let exceptSelector = binding.value.exceptSelector;
        selectors = selectors.filter((selector) => e.querySelectorAll(selector).length);
        let list = generateNavTree(e, selectors, exceptSelector);
        binding.value.callback(list);
        freeze = false;
      });
      freeze = true;
    };

    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    el.value.__observer = new MutationObserver(() => {
      el.value.__generateNav && el.value.__generateNav();
    });
    const func = () => {
      el.value.__observer.observe(e, OPTIONS);
      el.value.__generateNav && el.value.__generateNav();
    };
    binding.instance.$nextTick(func);
  },
  unmounted() {
    if (el.value.__generateNav) {
      delete el.value.__generateNav;
    }
    if (el.value.__observer) {
      el.value.__observer.takeRecords();
      el.value.__observer.disconnect();
      delete el.value.__observer;
    }
  },
};
