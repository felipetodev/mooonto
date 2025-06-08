CREATE TABLE `form_expenses` (
	`id` integer PRIMARY KEY NOT NULL,
	`form_id` text NOT NULL,
	`self_employed` integer NOT NULL,
	`consultancy` integer NOT NULL,
	`lifecycle_equipment` integer NOT NULL,
	`subscriptions` integer NOT NULL,
	`cowork` integer NOT NULL,
	`office_rent` integer,
	`office_insurance` integer,
	`office_bills` integer,
	`office_internet` integer,
	`gasoline` integer NOT NULL,
	`coffee` integer NOT NULL,
	`water` integer NOT NULL,
	`living_expenses` integer NOT NULL,
	`common_expenses` integer NOT NULL,
	`food` integer NOT NULL,
	`gym` integer NOT NULL,
	`entertainment` integer NOT NULL,
	`clothes` integer NOT NULL,
	`car_fee` integer NOT NULL,
	`living_expenses_two` integer,
	`internet` integer NOT NULL,
	`personal_phone` integer NOT NULL,
	`health_plan` integer NOT NULL,
	`retirement_fund` integer NOT NULL,
	`other_expenses` integer NOT NULL,
	`childrens` integer NOT NULL,
	`quantity_childrens` integer,
	`childrens_expenses` integer,
	`living_expenses_two_two` integer,
	`car_insurance` integer,
	`taxes` integer,
	`un_expected_expenses` integer,
	`value_contribution` integer,
	`income_tax_retention` integer,
	FOREIGN KEY (`form_id`) REFERENCES `forms`(`form_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `form_tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`form_id` text NOT NULL,
	`tag_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`form_id`) REFERENCES `forms`(`form_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `forms` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`form_id` text DEFAULT (gen_random_uuid()) NOT NULL,
	`user_id` text NOT NULL,
	`description` text,
	`slug` text,
	`is_active` integer DEFAULT (0) NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `forms_form_id_unique` ON `forms` (`form_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `forms_slug_unique` ON `forms` (`slug`);--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`user_id` text NOT NULL,
	`color` text DEFAULT '#6B7280',
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`username` text,
	`name` text NOT NULL,
	`last_name` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`image_url` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_user_id_unique` ON `users` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);