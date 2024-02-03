/**
 * 
 * @param {*} array 
 * @param {*} left 
 * @param {*} right 
 * @param {*} temp 
 * 归并排序的实现
 */
function mergesort(array, left, right) {
  if (left < right) {
    var mid = Math.floor((left + right) / 2);
    mergesort(array, left, mid); // 左边有序
    mergesort(array, mid + 1, right); // 右边有序
    mergearray(array, left, mid, right); // 再将二个有序数列合并
  }
}

// 将有二个有序数列array[left...mid]和array[mid...right]合并。
function mergearray(array, left, mid, right) {
  var i = left;
  var j = mid + 1;
  var p = 0;
  var temp = [];
  while (i <= mid && j <= right) {
    if (array[i] <= array[j]) {
      temp[p++] = array[i++];
    } else {
      temp[p++] = array[j++];
    }
  }
  while (i <= mid) {
    temp[p++] = array[i++];
  }
  while (j <= right) {
    temp[p++] = array[j++];
  }
  for (i = 0; i < p; i++) {
    array[left + i] = temp[i];
  }
}


// 测试用例
var array = [7,5,6,4];
mergesort(array, 0, array.length - 1)
console.log(array); // [ 4, 5, 6, 7 ]
