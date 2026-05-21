import AppIntents

@available(iOS 16.0, *)
struct AppShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: AddReminderIntent(),
            phrases: [
                "Add to \(.applicationName) app",
            ],
            shortTitle: "Add Reminder",
            systemImageName: "bell.badge"
        )
    }
}
