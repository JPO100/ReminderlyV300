import AppIntents

@available(iOS 16.0, *)
struct AppShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: AddReminderIntent(),
            phrases: [
                "Open \(.applicationName) to add",
                "New \(.applicationName) reminder",
            ],
            shortTitle: "Add Reminder",
            systemImageName: "bell.badge"
        )
    }
}
