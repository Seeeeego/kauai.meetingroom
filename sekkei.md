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

3. コンポーネント構成
責任範囲を明確にするため、以下のコンポーネントおよびファイルに分割してカプセル化を行う。
RoomList (Props: rooms, selectedRoomId, onSelectRoom)
利用可能な会議室をループ処理（map）で一覧カードとして出力するコンポーネント。選択中のカードには視覚的な強調スタイル（border: 2px solid #0070f3 など）を適用する。
ReserveForm (Props: selectedRoomName, selectedRoomId, onSubmit)
予約情報の入力とバリデーションを担当するコンポーネント。送信が正常に通過した場合に親の onSubmit を発火させ、自身のフォーム状態を空文字に初期化する。
Dashboard (State管理)
全体の親（統括）コンポーネント。会議室マスターデータ、現在の選択状況、登録された予約一覧データ、成功トーストメッセージのすべての状態を集約して保持する。
4. state設計（検討ポイントのみ提示）
予約一覧のstate管理の最適化:
現状、予約一覧のstateは親である Dashboard で保持しているが、今後「日付による絞り込み機能」や「過去の予約の自動アーカイブロジック」などが追加されることを見据えると、stateおよび追加・削除などの操作ロジックを専用のカスタムフック（例: useReservations）に切り出すべきかは要検討。
フォームの制御方式とライブラリ導入の是非:
現在はシンプルなオブジェクト型Stateで入力を管理しているが、今後「複数日程の一括選択」や「備品追加の連動バリデーション」など要件が複雑化する場合は、コードの肥大化を防ぐために React Hook Form などの外部ライブラリへの移行を視野に入れるべきか検討する。
UI/UX 画面レイアウト設計の固定化:
画面を遷移させずに「会議室選択」「フォーム入力」「予約一覧」を1画面に収めるため、上段に横並び（display: flex）で操作エリアを配置し、下段に境界線を設けて <table> による予約一覧エリアを配置しているが、スマートフォン等のレスポンシブ対応時にどのような並び順（縦並びへのフォールバック等）にするかは要検討。