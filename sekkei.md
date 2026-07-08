# 📐 会議室予約システム 設計書

## 1. 型定義
TypeScriptによる厳格な型定義を行い、コンポーネント間のインターフェース安全性を保証する。

```typescript
export type Room = {
  id: number;
  name: string;
  capacity: number;
  description?: string;
};


export type CreateReservationRequest = {
  roomId: number;
  startAt: string; // ISO 8601 形式の文字列
  endAt: string;   // ISO 8601 形式の文字列
  purpose?: string;
};

export type Reservation = {
  id: string;      // crypto.randomUUID() によるユニークID
  roomName: string;
  startAt: string; // 表示用（YYYY/MM/DD HH:mm）
  endAt: string;   // 表示用（YYYY/MM/DD HH:mm）
  purpose: string;
};
```

## 2. コンポーネント構成
責任範囲を明確にするため、以下のコンポーネントおよびファイルに分割してカプセル化を行う。

*   **RoomList** (Props: `rooms`, `selectedRoomId`, `onSelectRoom`)
    *   利用可能な会議室をループ処理（`map`）で一覧カードとして出力するコンポーネント。選択中のカードには視覚的な強調スタイル（`border: 2px solid #0070f3` など）を適用する。
*   **ReserveForm** (Props: `selectedRoomName`, `selectedRoomId`, `onSubmit`)
    *   予約情報の入力とバリデーションを担当するコンポーネント。送信が正常に通過した場合に親の `onSubmit` を発火させ、自身のフォーム状態を空文字に初期化する。
*   **Dashboard** (State管理)
    *   全体の親（統括）コンポーネント。会議室マスターデータ、現在の選択状況、登録された予約一覧データ、成功トーストメッセージのすべての状態を集約して保持する。

---

## 3. state設計

*   **必要十分な最小構成**
    *   まずは「部屋を選んで3項目を入力する」というシンプルな要件であるため、外部ライブラリを使わず `useState` だけで構築し、コードの肥大化を防ぐ。
*   **高い可読性と保守性**
    *   特殊な技術を使わない標準的な構文のみで完結しているため、誰が見ても「どこでデータが変わり、どう画面が動くか」が直感的に理解できる設計にしています。