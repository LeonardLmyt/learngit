var i = 0;
function timedCount() {
    for (var j = 0, sum = 0; j < 100; j++) {
        for (var i = 0; i < 100000000; i++) {
            sum += i;
        };
    };
    //���õ���sum���ͻ����߳�
    postMessage(sum);
};
//��ִ��timedCountǰ��ʱ�䣬ͨ��postMessage���ͻ����߳�
postMessage('Before computing, ' + new Date());
timedCount();
//����timedCount�󣬽�����ʱ�䷢�ͻ����߳�
postMessage('After computing, ' + new Date());

