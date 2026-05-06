/**
 * Context Grammar — Token metadata catalog.
 * Mirrors context-tokens-spec.yaml for runtime use.
 */

import type {
  AutonomyDial,
  CognitiveLoad,
  DisclosureDial,
  Feasibility,
  FormFactor,
  PhysicalState,
  PriorityWeight,
  SocialExposure,
} from './types.js';

interface TokenValue<T extends string> {
  id: T;
  label: string;
  mock_signal?: string;
}

interface TokenMetadata<T extends string> {
  number: number;
  name: string;
  name_ja: string;
  category: 'situation' | 'relationship_dial';
  reality_level: 1 | 2 | 3 | 4 | 5;
  today_detectable: boolean;
  today_method: string;
  values: readonly TokenValue<T>[];
}

export const TOKENS = {
  physical_state: {
    number: 1,
    name: 'Physical State',
    name_ja: '身体状態',
    category: 'situation',
    reality_level: 4,
    today_detectable: true,
    today_method: 'iOS CMMotionActivityManager / Android Activity Recognition',
    values: [
      { id: 'stationary_both_hands', label: 'Stationary · both hands free' },
      { id: 'stationary_one_hand', label: 'Stationary · one hand' },
      { id: 'walking', label: 'Walking' },
      { id: 'transit_passive', label: 'Passive transit' },
      { id: 'driving', label: 'Driving' },
      { id: 'exercising', label: 'Exercising' },
      { id: 'lying_down', label: 'Lying down' },
    ],
  } satisfies TokenMetadata<PhysicalState>,

  cognitive_load: {
    number: 2,
    name: 'Cognitive Load',
    name_ja: '認知負荷',
    category: 'situation',
    reality_level: 2,
    today_detectable: false,
    today_method: 'Estimation only — never directly measured',
    values: [
      { id: 'low', label: 'Low load' },
      { id: 'moderate', label: 'Moderate load' },
      { id: 'high', label: 'High load' },
      { id: 'overloaded', label: 'Overloaded' },
    ],
  } satisfies TokenMetadata<CognitiveLoad>,

  social_exposure: {
    number: 3,
    name: 'Social Exposure',
    name_ja: '社会的露出',
    category: 'situation',
    reality_level: 4,
    today_detectable: true,
    today_method: 'Privacy Display, Visual ID, Voice ID, BLE proximity',
    values: [
      { id: 'private', label: 'Private (alone)' },
      { id: 'trusted_partner', label: 'With partner' },
      { id: 'family_with_children', label: 'Family with children' },
      { id: 'social_acquaintances', label: 'Social / acquaintances' },
      { id: 'public', label: 'Public' },
    ],
  } satisfies TokenMetadata<SocialExposure>,

  priority_weight: {
    number: 4,
    name: 'Priority Weight',
    name_ja: '優先度',
    category: 'situation',
    reality_level: 3,
    today_detectable: true,
    today_method: 'Calendar/email priority APIs (per-domain)',
    values: [
      { id: 'critical', label: 'Critical · irreversible' },
      { id: 'high', label: 'High · time-sensitive' },
      { id: 'standard', label: 'Standard' },
      { id: 'low', label: 'Low · exploratory' },
    ],
  } satisfies TokenMetadata<PriorityWeight>,

  form_factor: {
    number: 5,
    name: 'Form Factor',
    name_ja: 'フォームファクター',
    category: 'situation',
    reality_level: 4,
    today_detectable: true,
    today_method: 'Device hardware ID, AirPlay/Cast/DeX detection',
    values: [
      { id: 'phone_handheld', label: 'Phone (handheld)' },
      { id: 'phone_folded', label: 'Foldable (folded)' },
      { id: 'phone_unfolded', label: 'Foldable (unfolded)' },
      { id: 'tablet', label: 'Tablet' },
      { id: 'tv_display', label: 'TV / large display' },
      { id: 'fridge_display', label: 'Smart fridge' },
      { id: 'car_display', label: 'Car dashboard' },
      { id: 'watch', label: 'Smartwatch' },
      { id: 'desktop_monitor', label: 'Desktop (DeX)' },
    ],
  } satisfies TokenMetadata<FormFactor>,

  feasibility: {
    number: 6,
    name: 'Feasibility',
    name_ja: '実現可能性',
    category: 'situation',
    reality_level: 3,
    today_detectable: true,
    today_method: 'Inventory / maps / weather APIs (per-domain)',
    values: [
      { id: 'fully_feasible', label: 'Fully feasible' },
      { id: 'partially_feasible', label: 'Partially feasible' },
      { id: 'infeasible', label: 'Infeasible' },
    ],
  } satisfies TokenMetadata<Feasibility>,

  autonomy_dial: {
    number: 7,
    name: 'Autonomy Dial',
    name_ja: '自律度ダイアル',
    category: 'relationship_dial',
    reality_level: 3,
    today_detectable: true,
    today_method: 'User-configurable + service default + AI proposal',
    values: [
      { id: 'suggest', label: 'Suggest' },
      { id: 'confirm', label: 'Confirm' },
      { id: 'notify', label: 'Notify' },
      { id: 'auto', label: 'Auto' },
    ],
  } satisfies TokenMetadata<AutonomyDial>,

  disclosure_dial: {
    number: 8,
    name: 'Disclosure Dial',
    name_ja: '開示ダイアル',
    category: 'relationship_dial',
    reality_level: 2,
    today_detectable: false,
    today_method: 'Per-app permissions; unified per-domain dial does not yet exist',
    values: [
      { id: 'none', label: 'None' },
      { id: 'minimal', label: 'Minimal' },
      { id: 'moderate', label: 'Moderate' },
      { id: 'full', label: 'Full' },
    ],
  } satisfies TokenMetadata<DisclosureDial>,
} as const;
