import type { StaticImageData } from 'next/legacy/image';

export type MemberTypes = 'developer' | 'designer' | 'pm' | 'anyone';
export type CapitalizedMemberTypes = 'Developer' | 'Designer' | 'PM' | 'Anyone';
export type representativeImageTypes = string | StaticImageData;

export interface ProjectOverview {
  id: number;
  title: string;
  views: number;
  bookmarkCount: number;
  hashtags: string[];
  memberTypes: MemberTypes[];
  memberCount: number;
  recruitCount: number;
  representativeImage: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  contentHTML: string;
  contentMarkdown: string;
  views: number;
  createdAt: string;
  updatedAt: string | null;
  hashtags: string[];
  memberTypes: MemberTypes[];
  recruitCount: number;
  representativeImage: string | null;
}

export interface ProjectBlockPost
  extends Omit<ProjectOverview, 'representativeImage' | 'memberTypes'> {
  bookmark: boolean;
  representativeImage: string | StaticImageData;
  memberTypes: CapitalizedMemberTypes[];
}
