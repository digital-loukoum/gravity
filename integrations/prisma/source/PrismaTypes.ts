export type PrismaEntityProperty<
	PrismaEntity,
	PropertyName extends string,
> = PrismaEntity extends { [Key in PropertyName]: infer Result }
	? Result
	: never;

export type PrismaEntityParameter<
	PrismaEntity,
	MethodName extends string,
	ParameterName extends string,
> = PrismaEntity extends { [Key in MethodName]: (options: any) => any }
	? Required<Parameters<PrismaEntity[MethodName]>>["0"] extends {
			[Key in ParameterName]?: infer Result;
	  }
		? Result
		: never
	: never;

type Selectable<SelectOption> = SelectOption extends Record<string, any>
	? {
			[Key in keyof Required<SelectOption>]?:
				| true
				| (NonNullable<SelectOption[Key]> extends
						| boolean
						| {
								select?: infer SubSelectOption;
						  }
						? Selectable<SubSelectOption>
						: never);
	  }
	: never;

export type PrismaWhere<Type> = PrismaEntityParameter<
	Type,
	"findMany",
	"where"
>;
export type PrismaSelect<Type> = PrismaEntityParameter<
	Type,
	"findMany",
	"select"
>;
export type PrismaInclude<Type> = PrismaEntityParameter<
	Type,
	"findMany",
	"include"
>;
export type PrismaSelectable<Type> = Selectable<
	PrismaEntityParameter<Type, "findMany", "select">
>;
