import './web-components/iframe-content';
import { Type } from './config/enum';
import { Host } from './config/host';
import { generateElements } from '../utils/index';

interface Props {
  mountDom: any;
  env: 'sim' | 'pre' | 'prod';
  type: Type.GroupSelection | Type.Upload | Type.GroupList;
  onChange?: (data?: any) => any;
}

/**
 * 封装成类，接入方需要new来创建，
 * 因为接入方的一个页面可能存在多个sdk的组件
 */
export class IbddpSdk {
  props: Props;
  iframeContent: Element;
  constructor(props: Props) {
    this.props = props;
    this.init();
  }

  init() {
    const { env, type } = this.props;
    const host = Host[env][type];
    this.iframeContent = generateElements(`
      <iframe-content
        src='${host}'
      >
      </iframe-content>
    `)[0];
    window.addEventListener('message', this.onMessage);
    /**
     * 初始化iframe容器
     * 支持打开多个不同页面 用type来区分
     */
  }

  open() {
    this.props.mountDom.appendChild(this.iframeContent);
    // 打开iframe页面
  }

  destroy() {
    // 销毁iframe容器
    const { mountDom } = this.props;
    if (mountDom.contains(this.iframeContent)) {
      mountDom.removeChild(this.iframeContent);
    }
    window.removeEventListener('message', this.onMessage);
  }

  onMessage(e: any) {
    /**
     * 监听iframe传过来的数据
     */
    const { env, onChange } = this.props;
    const { type, data } = e.data;
  }

  postMessage(type: string, data: {}) {
    /**
     * 给iframe页面传输数据
     */
    const contentWindow = this.iframeContent.shadowRoot.querySelector('iframe').contentWindow;
    contentWindow.postMessage({ type, data: JSON.stringify(data) }, '*');
  }
}
