<template>
  <view id="content" class="content">
    <draggable v-model="list" @end="setList">
      <view v-for="item in list" :key="item.id">
        <widget-shape v-if="item" :widget="item">
          <render-widget :item="item"></render-widget>
        </widget-shape>
      </view>
    </draggable>
  </view>
</template>

<script>
import draggable from "@/utils/vuedraggable.umd.min.js";
import WidgetShape from "@/components/widget-shape";
import RenderWidget from "@/components/render-widget";
import { mapMutations } from "vuex";
import domtoimage from "dom-to-image";

export default {
  components: {
    WidgetShape,
    RenderWidget,
    draggable,
  },

  provide() {
    return {
      page: this,
    };
  },

  data() {
    return {
      curWidgetId: undefined,
      insertIndex: -1,
      watingIndex: 0,
      list: [],
      waiting: {
        id: "-1",
        component: "waiting",
      },
    };
  },

  onLoad() {
    this.getMessage();
  },

  created() {
    this.listeningDom();
  },

  methods: {
    ...mapMutations(["setProject"]),
    getMessage() {
      let self = this;
      window.addEventListener("message", function (e) {
        if (e.source != window.parent) return;

        if (e.data) {
          let { even, params } = e.data;

          if (even == "init") self.init(params);

          if (even == "move") self.moveWaiting(self, params);

          if (even == "drop") self.addWidget(self, params);

          if (even == "list") self.list = params;

          if (even == "cover") self.createCover();

          if (even == "changeCurrWidget") self.setCurWidgetId(params.id);
        }
      });
    },

    init(params) {
      this.setProject(params.project)
    },

    listeningDom() {
      let MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;

      new MutationObserver(this.debounce(this.messageHeight, 100)).observe(
        document.body,
        {
          attributes: true,
          childList: true,
          subtree: true,
        }
      );
    },

    messageHeight() {
      this.list.map((item) => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(`#widget${item.id}`)
          .boundingClientRect((data) => {
            item.height = data.height;
          })
          .exec();
      });

      window.parent.postMessage({ type: "setHeight", params: this.list }, "*");
    },

    debounce(fn, wait) {
      let timer;
      return function () {
        const context = this;
        const args = [...arguments];
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context, args);
        }, wait);
      };
    },

    moveWaiting(self, params) {
      let haveWaiting = self.list.find((item) => item.component == "waiting");

      if (params.type == "widget") {
        let index = self.list.findIndex((item) => item.id == params.id);
        let watingIndex = self.list.findIndex(
          (item) => item.component == "waiting"
        );

        if (!haveWaiting) {
          self.list.splice(
            params.direction ? index : index + 1,
            0,
            self.waiting
          );
        } else {
          let isWaiting = self.list[index].component == "waiting";

          // console.log(`index:${index}`);
          // console.log(`isWaiting:${isWaiting}`);

          if (isWaiting) return;

          const temp = self.list.splice(watingIndex, 1);
          let cuurIndex = self.list.findIndex((item) => item.id == params.id);
          this.insertIndex = params.direction ? cuurIndex : cuurIndex + 1;
          self.list.splice(this.insertIndex, 0, temp[0]);
        }
      } else {
        if (!haveWaiting) {
          this.list.push(self.waiting);
        }
      }
    },

    addWidget(self, params) {
      let watingIndex = self.list.findIndex(
        (item) => item.component == "waiting"
      );

      if (watingIndex != -1) {
        self.list.splice(watingIndex, 1, params);
      } else {
        self.list.push(params);
      }

      this.setList();
    },

    setList() {
      window.parent.postMessage(
        { type: "setList", params: { list: this.list } },
        "*"
      );
    },

    setCurWidgetId(id) {
      this.curWidgetId = id;
      window.parent.postMessage({ type: "setCurrWidget", params: { id } }, "*");
    },

    async createCover() {
      let node = document.getElementById("content");
      let base64 = await domtoimage.toPng(node);

      window.parent.postMessage(
        { type: "getCoverBase64", params: { base64 } },
        "*"
      );
    },
  },
};
</script>

<style lang='scss'>
page {
  background-color: #f5f5f5;
}
</style>
