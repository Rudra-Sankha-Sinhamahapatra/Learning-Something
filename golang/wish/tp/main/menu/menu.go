package menu

import (
	"strings"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type menuModel struct {
	cursor int
	items  []string
	width  int
	height int
}

func InitialMenuModel() menuModel {
	return menuModel{
		cursor: 0,
		items:  []string{"Home", "About", "Projects", "Contact"},
		width:  80,
		height: 24,
	}
}

func (m menuModel) Init() tea.Cmd {
	return nil
}

func (m menuModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.width = msg.Width
		m.height = msg.Height
	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c", "q":
			return m, tea.Quit
		case "left":
			if m.cursor > 0 {
				m.cursor--
			}
		case "right":
			if m.cursor < len(m.items)-1 {
				m.cursor++
			}
		}
	}
	return m, nil
}

func (m menuModel) View() string {
	var (
		titleStyle = lipgloss.NewStyle().
				Foreground(lipgloss.Color("#FFFFFF")).
				Bold(true).
				Padding(0, 1)

		navItemStyle = lipgloss.NewStyle().
				Foreground(lipgloss.Color("#FFFFFF")).
				Padding(0, 2).
				Margin(0, 1)

		selectedNavStyle = lipgloss.NewStyle().
					Foreground(lipgloss.Color("#000000")).
					Background(lipgloss.Color("#FF6B35")).
					Padding(0, 2).
					Margin(0, 1).
					Bold(true)

		borderStyle = lipgloss.NewStyle().
				Border(lipgloss.NormalBorder()).
				BorderForeground(lipgloss.Color("#FF6B35")).
				Padding(1).
				Width(m.width - 2)

		footerStyle = lipgloss.NewStyle().
				Foreground(lipgloss.Color("#888888")).
				Align(lipgloss.Center).
				Width(m.width - 4)
	)

	title := titleStyle.Render("Rudra | Portfolio")

	var navItems []string
	for i, item := range m.items {
		if i == m.cursor {
			navItems = append(navItems, selectedNavStyle.Render(item))
		} else {
			navItems = append(navItems, navItemStyle.Render(item))
		}
	}

	navigation := lipgloss.JoinHorizontal(lipgloss.Left, navItems...)
	header := lipgloss.JoinHorizontal(lipgloss.Left, title, strings.Repeat(" ", 20), navigation)

	content := m.getContent()

	footer := footerStyle.Render("Press 'q' to quit | Use arrow keys to navigate")

	body := lipgloss.JoinVertical(lipgloss.Left,
		header,
		strings.Repeat("-", m.width-4),
		content,
		"",
		footer,
	)

	return borderStyle.Render(body)
}

func (m menuModel) getContent() string {
	var (
		contentStyle = lipgloss.NewStyle().
				Foreground(lipgloss.Color("#FFFFFF")).
				Padding(1, 0)

		sectionTitleStyle = lipgloss.NewStyle().
					Foreground(lipgloss.Color("#FF6B35")).
					Bold(true).
					Padding(0, 0, 1, 0)

		skillBoxStyle = lipgloss.NewStyle().
				Border(lipgloss.RoundedBorder()).
				BorderForeground(lipgloss.Color("#666666")).
				Padding(0, 1).
				Margin(0, 1).
				Foreground(lipgloss.Color("#FFFFFF"))
	)

	switch m.cursor {
	case 0:
		return contentStyle.Render(`
Welcome to my Terminal Portfolio!

I'm a full stack developer passionate about creating amazing software.
Navigate through the sections to learn more about me and my work.`)

	case 1:
		aboutTitle := sectionTitleStyle.Render("# About Me")
		aboutText := "21 | Software Engineer. Explore the\nopen-source projects and libraries I maintain on GitHub"

		techTitle := sectionTitleStyle.Render("# Tools & Technologies")

		langTitle := lipgloss.NewStyle().Foreground(lipgloss.Color("#CCCCCC")).Bold(true).Render("## Languages")
		languages := []string{"Python", "C", "JavaScript", "TypeScript", "Go"}
		var langBoxes []string
		for _, lang := range languages {
			langBoxes = append(langBoxes, skillBoxStyle.Render(lang))
		}
		langRow := lipgloss.JoinHorizontal(lipgloss.Left, langBoxes...)

		fwTitle := lipgloss.NewStyle().Foreground(lipgloss.Color("#CCCCCC")).Bold(true).Render("## Frameworks & Libraries")
		frameworks := []string{"ExpressJS", "ReactJS", "NextJS", "Tailwind CSS", "Nest Js", "Gin"}
		var fwBoxes []string
		for _, fw := range frameworks {
			fwBoxes = append(fwBoxes, skillBoxStyle.Render(fw))
		}
		fwRow := lipgloss.JoinHorizontal(lipgloss.Left, fwBoxes...)

		toolsTitle := lipgloss.NewStyle().Foreground(lipgloss.Color("#CCCCCC")).Bold(true).Render("## Tools & Platforms")

		devTools := []string{"Git", "Docker", "Jest", "Vitest"}
		var devBoxes []string
		for _, tool := range devTools {
			devBoxes = append(devBoxes, skillBoxStyle.Render(tool))
		}
		devRow := lipgloss.JoinHorizontal(lipgloss.Left, devBoxes...)

		databases := []string{"PostgreSQL", "Mongo DB", "Redis", "Prisma", "Drizzle"}
		var dbBoxes []string
		for _, db := range databases {
			dbBoxes = append(dbBoxes, skillBoxStyle.Render(db))
		}
		dbRow := lipgloss.JoinHorizontal(lipgloss.Left, dbBoxes...)

		monitoring := []string{"Prometheus", "Grafana", "Kafka"}
		var monBoxes []string
		for _, mon := range monitoring {
			monBoxes = append(monBoxes, skillBoxStyle.Render(mon))
		}
		monRow := lipgloss.JoinHorizontal(lipgloss.Left, monBoxes...)

		return contentStyle.Render(lipgloss.JoinVertical(lipgloss.Left,
			aboutTitle,
			aboutText,
			"",
			techTitle,
			"",
			langTitle,
			langRow,
			"",
			fwTitle,
			fwRow,
			"",
			toolsTitle,
			devRow,
			dbRow,
			monRow,
		))

	case 2:
		projectTitle := sectionTitleStyle.Render("# My Projects")
		return contentStyle.Render(lipgloss.JoinVertical(lipgloss.Left,
			projectTitle,
			"",
			"Terminal Portfolio - Interactive SSH-based portfolio using Go, Wish, and Bubbletea",
			"AI PPT generator - AI PPT generator made using Next js,Typescript,Go,Redis,PostgreSQL",
			"Adda AI - Full stack ai chat app, chat with ai characters",
			"Real-time Chat - WebSocket-based chat application with Redis pub/sub",
		))

	case 3:
		contactTitle := sectionTitleStyle.Render("# Get In Touch")
		return contentStyle.Render(lipgloss.JoinVertical(lipgloss.Left,
			contactTitle,
			"",
			"Email: workforrudra24@gmail.com",
			"GitHub: https://github.com/Rudra-Sankha-Sinhamahapatra",
			"LinkedIn: https://www.linkedin.com/in/rudra-sankha-sinhamahapatra-6311aa1bb/",
			"Twitter: https://x.com/RudraSankha",
			"",
			"Feel free to reach out for collaborations or just to say hi!",
		))

	default:
		return contentStyle.Render("Select a menu item to view content.")
	}
}
