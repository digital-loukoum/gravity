import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";

import { Viewer } from "@/graphql/graphql.context";
import { CurrentUser } from "@/user/decorators/current-user.decorator";

import { CompanyService } from "../company.service";
import {
	CompanyBrandExcludeInput,
	CompanyBrandExcludeOutput,
} from "../dto/company-brand-exclude.dto";
import {
	CompanyCampaignExcludeInput,
	CompanyCampaignExcludeOutput,
} from "../dto/company-campaign-exclude.dto";
import {
	CompanyCategoryExcludeInput,
	CompanyCategoryExcludeOutput,
} from "../dto/company-category-exclude.dto";
import {
	CompanyCreateArgs,
	CompanyCreateOutput,
} from "../dto/company-create.dto";
import {
	CompanyFeatureDisableInput,
	CompanyFeatureDisableOutput,
} from "../dto/company-feature-disable.dto";
import {
	CompanyFeatureEnableInput,
	CompanyFeatureEnableOutput,
} from "../dto/company-feature-enable.dto";
import {
	CompanyMembersImportInput,
	CompanyMembersImportOutput,
} from "../dto/company-members-import.dto";
import {
	CompanyMembersImportDryRunInput,
	CompanyMembersImportDryRunOutput,
} from "../dto/company-members-import-dry-run.dto";
import {
	CompanyMembershipCreateInput,
	CompanyMembershipCreateOutput,
} from "../dto/company-membership-create.dto";
import {
	CompanyMembershipUpdateInput,
	CompanyMembershipUpdateOutput,
} from "../dto/company-membership-update.dto";
import {
	CompanyUpdateArgs,
	CompanyUpdateOutput,
} from "../dto/company-update.dto";
import { Company } from "../models/company.model";
import { CompanyMembership } from "../models/company-membership.model";

@Resolver(Company)
export class CompanyMutationsResolver {
	constructor(private readonly companyService: CompanyService) {}

	@Mutation(() => CompanyCreateOutput)
	public async companyCreate(
		@CurrentUser() viewer: Viewer,
		@Args() { input }: CompanyCreateArgs,
	) {
		return await this.companyService.companyCreate(viewer, input);
	}

	@Mutation(() => CompanyUpdateOutput)
	public async companyUpdate(
		@CurrentUser() viewer: Viewer,
		@Args() { companyId, input }: CompanyUpdateArgs,
	) {
		return await this.companyService.companyUpdate(viewer, companyId, input);
	}

	@Mutation(() => CompanyFeatureEnableOutput)
	public async companyFeatureEnable(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID }) companyId: Company["id"],
		@Args("input") input: CompanyFeatureEnableInput,
	) {
		return await this.companyService.companyFeatureEnable(
			viewer,
			companyId,
			input,
		);
	}

	@Mutation(() => CompanyFeatureDisableOutput)
	public async companyFeatureDisable(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID }) companyId: Company["id"],
		@Args("input") input: CompanyFeatureDisableInput,
	) {
		return await this.companyService.companyFeatureDisable(
			viewer,
			companyId,
			input,
		);
	}

	@Mutation(() => CompanyMembershipCreateOutput)
	public async companyMembershipCreate(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID })
		companyId: string,
		@Args("input") input: CompanyMembershipCreateInput,
	) {
		return this.companyService.companyMembershipCreate(
			viewer,
			companyId,
			input,
		);
	}

	@Mutation(() => CompanyMembershipUpdateOutput)
	public async companyMembershipUpdate(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyMembershipId", type: () => ID })
		companyMembershipId: CompanyMembership["id"],
		@Args("input") input: CompanyMembershipUpdateInput,
	) {
		return this.companyService.companyMembershipUpdate(
			viewer,
			companyMembershipId,
			input,
		);
	}

	@Mutation(() => CompanyMembersImportOutput)
	public async companyMembersImport(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID }) companyId: Company["id"],
		@Args("input") input: CompanyMembersImportInput,
	) {
		return await this.companyService.companyMembersImport(
			viewer,
			companyId,
			input,
		);
	}

	@Mutation(() => CompanyMembersImportDryRunOutput)
	public async companyMembersDryRun(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID }) companyId: Company["id"],
		@Args("input") input: CompanyMembersImportDryRunInput,
	) {
		return await this.companyService.companyMembersDryRun(
			viewer,
			companyId,
			input,
		);
	}

	@Mutation(() => CompanyCategoryExcludeOutput)
	public async companyCategoryExcludeAdd(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID }) companyId: string,
		@Args("input") input: CompanyCategoryExcludeInput,
	) {
		return await this.companyService.companyCategoryExclude(
			viewer,
			companyId,
			input,
			"add",
		);
	}

	@Mutation(() => CompanyCategoryExcludeOutput)
	public async companyCategoryExcludeRemove(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID }) companyId: string,
		@Args("input") input: CompanyCategoryExcludeInput,
	) {
		return await this.companyService.companyCategoryExclude(
			viewer,
			companyId,
			input,
			"remove",
		);
	}

	@Mutation(() => CompanyBrandExcludeOutput)
	public async companyBrandExcludeAdd(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID }) companyId: string,
		@Args("input") input: CompanyBrandExcludeInput,
	) {
		return await this.companyService.companyBrandExclude(
			viewer,
			companyId,
			input,
			"add",
		);
	}

	@Mutation(() => CompanyBrandExcludeOutput)
	public async companyBrandExcludeRemove(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID }) companyId: string,
		@Args("input") input: CompanyBrandExcludeInput,
	) {
		return await this.companyService.companyBrandExclude(
			viewer,
			companyId,
			input,
			"remove",
		);
	}

	@Mutation(() => CompanyCampaignExcludeOutput)
	public async companyCampaignExcludeAdd(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID }) companyId: string,
		@Args("input") input: CompanyCampaignExcludeInput,
	) {
		return await this.companyService.companyCampaignExclude(
			viewer,
			companyId,
			input,
			"add",
		);
	}

	@Mutation(() => CompanyCampaignExcludeOutput)
	public async companyCampaignExcludeRemove(
		@CurrentUser() viewer: Viewer,
		@Args({ name: "companyId", type: () => ID }) companyId: string,
		@Args("input") input: CompanyCampaignExcludeInput,
	) {
		return await this.companyService.companyCampaignExclude(
			viewer,
			companyId,
			input,
			"remove",
		);
	}
}
