export function uuid() {
  return (Math.random() * 10241024) | 0 | 0x8;
}

export function DownloadJsonDataToLocal(data: any, filename: string) {
  /**
   * data就是正常数据就行
   * const blob = new Blob([data], { type: 文件类型 });
   */
  // 这是一个保存json代码片段的示例
  const blob = new Blob([JSON.stringify(data, null, '\t')], { type: 'text/json' });
  // 创建a标签并为其添加属性
  const link = document.createElement('a');
  link.href = (window.URL || window.webkitURL).createObjectURL(blob);
  link.download = filename; // 文件名字
  // 触发点击事件执行下载
  link.click();
}
