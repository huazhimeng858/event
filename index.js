/**
 * Created by Administrator on 2016-04-25.
 */
// event(�¼�)���߼�����Դ��github.com/markyun
markyun.Event = {
    // ҳ�������ɺ�
    readyEvent : function(fn) {
        if (fn==null) {
            fn=document;
        }
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = fn;
        } else {
            window.onload = function() {
                oldonload();
                fn();
            };
        }
    },
    // �������ֱ�ʹ��dom0||dom2||IE��ʽ �����¼�
    // ������ ������Ԫ��,�¼����� ,�¼��������
    addEvent : function(element, type, handler) {
        if (element.addEventListener) {
            //�¼����͡���Ҫִ�еĺ������Ƿ�׽
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function() {
                handler.call(element);
            });
        } else {
            element['on' + type] = handler;
        }
    },
    // �Ƴ��¼�
    removeEvent : function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.datachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    // ��ֹ�¼� (��Ҫ���¼�ð�ݣ���ΪIE��֧���¼�����)
    stopPropagation : function(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
        }
    },
    // ȡ���¼���Ĭ����Ϊ
    preventDefault : function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // ��ȡ�¼�Ŀ��
    getTarget : function(event) {
        return event.target || event.srcElement;
    },
    // ��ȡevent��������ã�ȡ���¼���������Ϣ��ȷ����ʱ��ʹ��event��
    getEvent : function(e) {
        var ev = e || window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                ev = c.arguments[0];
                if (ev && Event == ev.constructor) {
                    break;
                }
                c = c.caller;
            }
        }
        return ev;
    }
};
