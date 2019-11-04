import { Taco } from '@tacopie/taco';
import { h } from '@tacopie/taco';
import appTpl from "./AppTpl.html"

const _template = h(appTpl)

export default class App implements Taco {
    template(): string {
        return _template
    }
    setup() {
        return {}
    }
    // created() {
    //     this["$global"].currency = "￥"
    // }
}

