import { instance, payInstance } from 'lib/baseUrl';
import {
  GetAdminBoolPayload,
  GetAdminMoneyListPayload,
  GetFsTimetablePayload,
  GetLolTeamPayload,
  GetMatchPayload,
  GetMoneyPayload,
  GetPayShopPurchasePayload,
  GetReceiptListPayload,
  GetShopListPayload,
  GetSingerPayload,
  PostAdminMoneyApproveInterface,
  PostAdminMoneyPayload,
  PostLolVotePayload,
  PostReceiptConfirm,
  PostReceiptConfirmPayload,
  PostShopPurchasePayload,
  PostSingerVotePayload,
} from 'store/action';
import { PayItemType } from 'store/model';

export const getLolTeamRequest = (payload: GetLolTeamPayload) =>
  instance
    .get('/api/festival/lol/team', {
      headers: {
        access_token: payload.accessToken,
      },
    })
    .then(res => res.data);

export const getMatchRequest = (payload: GetMatchPayload) =>
  instance
    .get('/api/festival/event/match', {
      headers: {
        access_token: payload.accessToken,
      },
    })
    .then(res => res.data);

export const getSingerRequest = (payload: GetSingerPayload) =>
  instance
    .get('/api/festival/event/singer', {
      headers: {
        access_token: payload.accessToken,
      },
    })
    .then(res => res.data);

export const postSingerVoteRequest = (payload: PostSingerVotePayload) =>
  instance
    .post(
      '/api/festival/event/singer/vote',
      {
        singer_pk: payload.singerPk,
      },
      { headers: { access_token: payload.accessToken } },
    )
    .then(res => res.data);

export const postLolVoteRequest = (payload: PostLolVotePayload) =>
  instance
    .post(
      '/api/festival/lol/vote',
      {
        team_pk: payload.teamPk,
      },
      { headers: { access_token: payload.accessToken } },
    )
    .then(res => res.data);

export const getFsTimetableRequest = (payload: GetFsTimetablePayload) =>
  instance
    .get('/api/festival/timetable', {
      headers: {
        access_token: payload.accessToken,
      },
    })
    .then(res => res.data);

export const getPayShopPurchaseRequest = (payload: GetPayShopPurchasePayload) =>
  payInstance
    .get('/api/shop/purchase', {
      headers: {
        authorization: payload.accessToken,
      },
    })
    .then(res => res.data);

export const postAdminMoneyRequest = (payload: PostAdminMoneyPayload) =>
  payInstance
    .post(
      '/api/admin/money',
      { user_pk: payload.userPk, amount: payload.amount },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res.data);

export const getAdminMoneyListRequest = (payload: GetAdminMoneyListPayload) =>
  payInstance
    .get('/api/admin/money/deposit/list', {
      headers: {
        authorization: payload.accessToken,
      },
    })
    .then(res => res.data);

export const getMoneyRequest = (payload: GetMoneyPayload) =>
  payInstance
    .get('/api/user/money', {
      headers: {
        authorization: payload.accessToken,
      },
    })
    .then(res => res.data);

export const getAdminBoolRequest = (payload: GetAdminBoolPayload) =>
  payInstance
    .get('/api/admin', {
      headers: {
        authorization: payload.accessToken,
      },
    })
    .then(res => res.data);

export const postAdminMoneyApproveRequest = (
  payload: PostAdminMoneyApproveInterface,
) =>
  payInstance
    .post(
      '/api/admin/money/deposit/approve',
      { charge_pk: payload.charge_pk },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res.data);

export const getShopListRequest = (payload: GetShopListPayload) =>
  payInstance
    .get('/api/shop', {
      headers: {
        authorization: payload.accessToken,
      },
      params: {
        sort: payload.sort,
      },
    })
    .then(res => res.data);

export const postShopPurchaseRequest = (payload: PostShopPurchasePayload) =>
  payInstance
    .post(
      '/api/shop/purchase',
      {
        shop_pk: payload.shopPk,
        items: payload.items.map((items: PayItemType) => ({
          pk: items.item_pk,
          count: items.amount,
        })),
      },
      {
        headers: { authorization: payload.accessToken },
      },
    )
    .then(res => res.data);

export const getReceiptListRequest = (payload: GetReceiptListPayload) =>
  payInstance
    .get('api/receipt', {
      headers: { authorization: payload.accessToken },
    })
    .then(res => res.data);

export const postReceiptConfirmRequest = (payload: PostReceiptConfirmPayload) =>
  payInstance
    .post(
      '/api/receipt/confirm',
      {
        receipt_pk: payload.receipt_pk,
      },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res.data);
