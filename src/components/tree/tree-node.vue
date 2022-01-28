<template>
  <div class="tree-node-container">
    <node-content />
    <div
      v-if="nextShow"
      class="tree-node-children"
      :style="{
        paddingLeft: indent,
      }"
    >
      <tree-node
        v-for="(child, idx) of nodeData.children"
        :key="idx"
        :node-data="child"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  components: {
    'node-content': {
      render() {
        let slot = this.$parent.tree.$scopedSlots.default;
        let { nodeData, parentData, level } = this.$parent;
        return slot ? slot({ parentData, data: nodeData, level }) : '<div>未定义插槽内容</div>';
      },
    },
  },
  props: {
    nodeData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tree: false,
      level: 0,
      parentData: null,
      childrenShow: true,
      indent: undefined,
    };
  },
  computed: {
    nextShow() {
      return this.nodeData.children && this.nodeData.children.length && this.childrenShow;
    },
  },
  created() {
    let parent = this.$parent;
    if (parent.isTree) {
      this.level = 1;
      this.parentData = {};
    } else {
      this.level = parent.level + 1;
      this.parentData = parent.nodeData;
    }
    while (parent && !parent.isTree) {
      parent = parent.$parent;
    }
    this.tree = parent;
    this.indent = this.tree.indent;
    this.tree.registerNodeComponent(this.nodeData.id, this);
  },
  beforeUnmount() {
    this.tree.removeNodeComponent(this.nodeData.id);
  },
  methods: {
    showChildren() {
      this.childrenShow = true;
    },
    hideChildren() {
      this.childrenShow = false;
    },
  },
};
</script>
