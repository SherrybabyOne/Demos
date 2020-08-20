**块格式化上下文**（Block Formatting Context，BFC） 是Web页面的可视CSS渲染的一部分，是**块盒子**的布局过程发生的区域，也是**浮动元素**与其他元素交互的区域。

以下是创建BFC的方式：
- 根元素（<html>）
- 浮动元素（元素的 float 不是 none）
- overflow 值不为 visible 的块元素
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- display 值为 flow-root 的元素
- contain 值为 layout、content 或 paint 的元素
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

块格式化上下文包含创建它的元素内部的所有内容。

BFC的特点：
- 浮动定位和清除浮动时只会应用于同一个BFC内的元素。
- 浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。
- 外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间。
- 在一个BFC中，块盒与行盒都会垂直的沿着其父元素的边框排列。

