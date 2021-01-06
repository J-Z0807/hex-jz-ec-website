export default function (time) {
    const date = new Date(time * 1000);
    return date.toLocaleDateString(); //返回日期字串部分
}