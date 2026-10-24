#!/usr/bin/env python3
"""A private, local-first emotional release station."""

from __future__ import annotations

import json
import mimetypes
import os
import random
import re
import webbrowser
from datetime import datetime
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
DATA_DIR = BASE_DIR / "data"
VENT_LOG = DATA_DIR / "vents.jsonl"
DATA_DIR.mkdir(exist_ok=True)


THEMES = {
    "zh": {
        "tired": {
            "name": "疲惫",
            "opening": "听起来，你今天真的已经扛了太多。",
            "claim": "累到连一句话都不想多说，不是懒，也不是脆弱，是你的身体在提醒你：该被照顾了。",
            "step": "现在先别急着解决明天。喝几口温水，把肩膀放下来，给自己十分钟什么都不做。",
            "closing": "今天走到这里，已经很不容易了。剩下的，交给明天那个休息过的你。",
        },
        "wronged": {
            "name": "委屈",
            "opening": "这件事让你觉得委屈，不是你太敏感。",
            "claim": "被误解、被否定的时候，心里当然会疼；你不需要假装一句“没关系”就把自己糊弄过去。",
            "step": "先把事实和你感受到的委屈分开写下来。你不需要立刻原谅谁，也不欠任何人一个体面的微笑。",
            "closing": "委屈值得被听见，包括被你自己认真听见。",
        },
        "anxious": {
            "name": "焦虑",
            "opening": "你脑子里像是有很多扇窗同时被风吹开，对吗？",
            "claim": "焦虑不是想太多，它往往是因为你太想把每件事都做好，才让未来一下子挤进了此刻。",
            "step": "挑出那个最让你不安的念头，只问一句：接下来五分钟，我能做的最小一件事是什么？",
            "closing": "你不需要一次看清整条路，只需要看见脚下这一小步。",
        },
        "angry": {
            "name": "生气",
            "opening": "你有权生气，不需要先把情绪修整得漂亮，才有资格开口。",
            "claim": "愤怒有时是一道边界：它在告诉你，有什么东西被冒犯了，或者你承受得太久了。",
            "step": "先让身体把这股力量放出去：握拳五秒再松开，慢慢重复几次。等呼吸稳一点，再决定要不要回应。",
            "closing": "你的感受是真实的。你可以坚定，也可以温柔，不必二选一。",
        },
        "sad": {
            "name": "难过",
            "opening": "难过的时候，不用急着振作。你可以先在这里停一停。",
            "claim": "愿意说出“我不好”，其实已经是在照顾自己，而不是给别人添麻烦。",
            "step": "把手放在胸口，慢慢呼吸三次。今天不用证明自己很坚强，只要陪自己待一会儿。",
            "closing": "这一段低潮不是你的全部。等风小一点，我们再慢慢走。",
        },
        "lonely": {
            "name": "孤单",
            "opening": "我听见了那一点点“好像没有人真正懂我”的孤单。",
            "claim": "想要被理解、被陪伴，从来不是要求太多，这是人很自然的需要。",
            "step": "给一个让你感到安全的人发一句很短的话，不需要完整解释，只说：“我今天有点不好，想和你说句话。”",
            "closing": "此刻至少有一盏灯为你亮着。你不必一个人把所有黑夜都熬完。",
        },
        "overwhelmed": {
            "name": "被压垮",
            "opening": "这么多事一起压过来，会觉得喘不过气，真的很正常。",
            "claim": "你不是能力不够，只是此刻同时要拿的东西太多了。",
            "step": "找一张纸，把所有事情倒出来。只圈一件今天必须做的，其余暂时放下。",
            "closing": "先活过此刻，再谈效率和完美。你已经做得够多了。",
        },
        "unknown": {
            "name": "复杂",
            "opening": "谢谢你把这些话留在这里。我听见了。",
            "claim": "有些感受很难马上命名，不必急着分析它；能把它说出来，本身就已经是一种松开。",
            "step": "闭上眼睛，做三次慢一点的呼吸。吸气时不催促自己，呼气时允许肩膀往下沉一点。",
            "closing": "你不需要立刻变好。此刻没有评判，只有你和这段被认真接住的心情。",
        },
    },
    "en": {
        "tired": {
            "name": "exhaustion",
            "opening": "It sounds like you have been carrying far too much today.",
            "claim": "Feeling too tired to explain yourself is not laziness or fragility. Your body is asking to be cared for.",
            "step": "You do not have to solve tomorrow yet. Drink some water, let your shoulders drop, and give yourself ten minutes with nothing to accomplish.",
            "closing": "Getting this far today was already hard. Let tomorrow's rested version of you handle what comes next.",
        },
        "wronged": {
            "name": "hurt",
            "opening": "Feeling hurt by this does not mean you are being too sensitive.",
            "claim": "Being misunderstood or dismissed stings. You do not have to pretend it is fine just to make the moment easier for someone else.",
            "step": "Write down what happened separately from how it made you feel. You do not owe anyone instant forgiveness or a perfect smile.",
            "closing": "What hurt you deserves to be heard, including by you.",
        },
        "anxious": {
            "name": "anxiety",
            "opening": "It feels as if every window in your mind is being blown open at once, doesn't it?",
            "claim": "Anxiety is not simply overthinking. Sometimes it comes from caring so much that the future rushes into this moment all at once.",
            "step": "Choose the worry that feels loudest and ask only this: what is the smallest thing I can do in the next five minutes?",
            "closing": "You do not need to see the whole road. You only need the next small step.",
        },
        "angry": {
            "name": "anger",
            "opening": "You are allowed to be angry. Your feelings do not have to look tidy before they deserve to speak.",
            "claim": "Anger can be a boundary. It often tells us that something important was crossed or that we have held on for too long.",
            "step": "Let your body release some of that energy: squeeze your fists for five seconds, then release. Repeat a few times before deciding whether to respond.",
            "closing": "Your feelings are real. You can be firm and tender; you do not have to choose one.",
        },
        "sad": {
            "name": "sadness",
            "opening": "When you are sad, you do not have to rush to be okay. You can pause here.",
            "claim": "Saying “I am not okay” is a way of caring for yourself, not a burden you are placing on someone else.",
            "step": "Place a hand over your heart and take three slow breaths. You do not need to prove how strong you are today; just stay with yourself for a moment.",
            "closing": "This low point is not all of who you are. When the wind eases, we will walk again.",
        },
        "lonely": {
            "name": "loneliness",
            "opening": "I hear that quiet ache of feeling as though nobody quite understands.",
            "claim": "Wanting to be understood and accompanied is not asking for too much. It is a deeply human need.",
            "step": "Send one short message to someone safe: “I'm having a hard day. Could I talk with you for a minute?” You do not need a complete explanation.",
            "closing": "At least one light is on for you right now. You do not have to get through every long night alone.",
        },
        "overwhelmed": {
            "name": "overwhelm",
            "opening": "When everything comes at once, feeling unable to breathe makes sense.",
            "claim": "You are not incapable. You are simply trying to hold too many things at the same time.",
            "step": "Put every task on paper. Circle only what truly must happen today, and put the rest down for now.",
            "closing": "Getting through this moment comes before productivity or perfection. You have already done enough.",
        },
        "unknown": {
            "name": "whatever this is",
            "opening": "Thank you for leaving these words here. I hear you.",
            "claim": "Some feelings are hard to name right away. You do not have to analyse this perfectly; putting it into words is already a kind of release.",
            "step": "Close your eyes and take three slower breaths. Do not hurry the inhale; let your shoulders sink a little on the exhale.",
            "closing": "You do not need to feel better immediately. There is no judgement here, only this moment and this feeling being taken seriously.",
        },
    },
}

MOOD_ALIASES = {
    "tired": ("累", "疲惫", "困", "没力气", "加班", "熬夜", "burned out", "exhausted", "tired", "drained", "worn out"),
    "wronged": ("委屈", "误解", "冤枉", "不被理解", "羞辱", "委屈死", "骂", "unfair", "misunderstood", "blamed", "wronged"),
    "anxious": ("焦虑", "紧张", "担心", "害怕", "心慌", "压力", "睡不着", "anxious", "anxiety", "worried", "afraid", "panic"),
    "angry": ("生气", "愤怒", "火大", "气死", "讨厌", "烦死", "angry", "furious", "annoyed", "mad"),
    "sad": ("难过", "伤心", "想哭", "失落", "绝望", "低落", "分手", "sad", "cry", "heartbroken", "upset", "depressed", "breakup"),
    "lonely": ("孤独", "孤单", "没人懂", "没人陪", "一个人", "lonely", "alone", "isolated"),
    "overwhelmed": ("撑不住", "崩溃", "喘不过气", "压垮", "好多事", "忙不过来", "overwhelmed", "too much", "breaking down"),
}

WORK_PATTERNS = (
    "老板", "领导", "上司", "同事", "公司", "工作", "加班", "会议", "客户",
    "boss", "manager", "colleague", "work", "office", "deadline", "meeting",
)
HARSH_WORK_PATTERNS = (
    "骂", "批评", "指责", "训", "否定", "背锅", "甩锅",
    "yelled", "scolded", "criticized", "blamed",
)

SAFETY_PATTERNS = (
    "不想活", "想死", "自杀", "结束生命", "伤害自己", "活不下去",
    "kill myself", "suicide", "end my life", "hurt myself", "want to die",
    "don't want to live", "do not want to live", "don't want to be here",
)

EXTRA_ZH = {
    "work_soft": "工作里的批评，是一句关于某件事的评价，不是对你整个人的判决。",
    "work_hard": "被老板骂之后，那些话可能还在脑子里反复回响；可被苛刻对待，并不能说明你不够好。",
    "relationship": "关系里的失望最磨人，尤其是当你曾经认真投入过。",
    "sleep": "睡不好时，情绪本来就会被放大。今晚先把休息当成一件正经事。",
}

EXTRA_EN = {
    "work_soft": "Criticism at work is a response to one task; it is not a verdict on who you are.",
    "work_hard": "Your boss's words may still be echoing in your head, but being treated harshly does not mean you are not good enough.",
    "relationship": "Disappointment in a relationship is especially heavy when you genuinely cared.",
    "sleep": "When you have not slept well, feelings naturally become louder. Let rest be the real priority tonight.",
}


def detect_moods(text: str, selected: str = "") -> list[str]:
    lowered = text.casefold()
    found = []
    for mood, aliases in MOOD_ALIASES.items():
        if any(alias.casefold() in lowered for alias in aliases):
            found.append(mood)
    if not found and selected in THEMES["zh"]:
        found.append(selected)
    return (found or ["unknown"])[:3]


def has_safety_risk(text: str) -> bool:
    lowered = text.casefold()
    return any(pattern.casefold() in lowered for pattern in SAFETY_PATTERNS)


def compose_response(text: str, lang: str, selected_mood: str = "") -> dict:
    lang = "en" if lang == "en" else "zh"
    moods = detect_moods(text, selected_mood)
    primary = moods[0]
    theme = THEMES[lang][primary]
    lowered = text.casefold()
    is_work = any(word.casefold() in lowered for word in WORK_PATTERNS)
    is_harsh_work = is_work and any(word.casefold() in lowered for word in HARSH_WORK_PATTERNS)
    has_sleep_issue = any(word in lowered for word in ("没睡", "睡不着", "熬夜", "失眠", "sleep", "sleepless", "awake"))
    has_relationship = any(word in lowered for word in ("分手", "恋人", "伴侣", "感情", "男朋友", "女朋友", "breakup", "partner", "relationship"))

    extras = EXTRA_EN if lang == "en" else EXTRA_ZH
    extra = ""
    if is_harsh_work:
        extra = extras["work_hard"]
    elif is_work:
        extra = extras["work_soft"]
    elif has_relationship:
        extra = extras["relationship"]
    if has_sleep_issue:
        extra = (extra + " " + extras["sleep"]).strip()

    bridge_zh = [
        "先不用把这份感受整理得很体面。",
        "我在这些话里听见了你撑着的那部分。",
        "你愿意说出来，已经让这份重量有了一个落点。",
    ]
    bridge_en = [
        "You do not have to make this feeling presentable.",
        "I can hear the part of you that has been holding on.",
        "Putting this into words already gives the weight somewhere to rest.",
    ]
    bridge = random.choice(bridge_en if lang == "en" else bridge_zh)

    paragraphs = [
        theme["opening"],
        theme["claim"] + (" " + extra if extra else ""),
        bridge + " " + theme["step"],
    ]
    if has_safety_risk(text):
        safety = (
            "如果你此刻可能会伤害自己，请先停下手里的事，立刻联系身边可信任的人，或拨打 120 / 110 寻求紧急帮助。你不需要独自扛过这一刻。"
            if lang == "zh"
            else "If you may hurt yourself right now, please pause and contact someone you trust immediately, or call your local emergency service. You do not have to face this moment alone."
        )
        paragraphs.insert(1, safety)

    paragraphs.append(theme["closing"])
    return {
        "text": "\n\n".join(paragraphs),
        "moods": [THEMES[lang][m]["name"] for m in moods],
        "primaryMood": theme["name"],
        "safety": has_safety_risk(text),
    }


def append_to_log(record: dict) -> None:
    with VENT_LOG.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(record, ensure_ascii=False) + "\n")


class StationHandler(SimpleHTTPRequestHandler):
    server_version = "EmotionStation/1.0"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC_DIR), **kwargs)

    def log_message(self, fmt: str, *args) -> None:
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] {self.address_string()} {fmt % args}")

    def end_headers(self) -> None:
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self'; script-src 'self'; style-src 'self'; "
            "img-src 'self' data:; connect-src 'self'; media-src 'self'; "
            "object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
        )
        super().end_headers()

    def send_json(self, payload: dict, status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        if path == "/api/health":
            self.send_json({"ok": True, "service": "emotion-station"})
            return
        if path == "/":
            self.path = "/index.html"
        super().do_GET()

    def do_POST(self) -> None:
        if urlparse(self.path).path != "/api/vent":
            self.send_json({"error": "Not found"}, HTTPStatus.NOT_FOUND)
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 8_000_000:
                raise ValueError("Invalid request size")
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            raw_text = payload.get("message", "")
            text = re.sub(r"\s+", " ", str(raw_text)).strip()[:5000]
            lang = "en" if payload.get("lang") == "en" else "zh"
            selected_mood = str(payload.get("mood", ""))[:30]
            handwriting = payload.get("handwriting")
            if not text and not handwriting:
                self.send_json({"error": "empty"}, HTTPStatus.BAD_REQUEST)
                return
            if handwriting and (not isinstance(handwriting, str) or not handwriting.startswith("data:image/png;base64,")):
                handwriting = None

            reply = compose_response(text, lang, selected_mood)
            record = {
                "id": datetime.now().strftime("%Y%m%d%H%M%S%f"),
                "createdAt": datetime.now().astimezone().isoformat(),
                "lang": lang,
                "mood": selected_mood,
                "message": text,
                "music": bool(payload.get("music")),
                "hasHandwriting": bool(handwriting),
                "handwriting": handwriting,
                "reply": reply,
            }
            append_to_log(record)
            self.send_json({"ok": True, "id": record["id"], "reply": reply})
        except (ValueError, json.JSONDecodeError, UnicodeDecodeError) as exc:
            self.send_json({"error": "invalid_request", "detail": str(exc)}, HTTPStatus.BAD_REQUEST)
        except OSError as exc:
            self.send_json({"error": "storage_error", "detail": str(exc)}, HTTPStatus.INTERNAL_SERVER_ERROR)


def main() -> None:
    host = os.environ.get("STATION_HOST", "127.0.0.1")
    port = int(os.environ.get("STATION_PORT", "8765"))
    server = ThreadingHTTPServer((host, port), StationHandler)
    url = f"http://{host}:{port}"
    print("\n  情绪疗愈小站已开启")
    print(f"  {url}\n")
    print("  倾诉记录仅保存在本机 data/vents.jsonl")
    print("  按 Ctrl+C 关闭\n")
    if os.environ.get("STATION_NO_BROWSER") != "1":
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  小站已关闭，愿你今晚好眠。")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
