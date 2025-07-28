package menu

import (
	"strings"

	"menu/banner"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type menuModel struct {
	cursor       int
	items        []string
	width        int
	height       int
	scrollOffset int
}

func InitialMenuModel() menuModel {
	return menuModel{
		cursor:       0,
		items:        []string{"Home", "About", "Projects", "Contact"},
		width:        80,
		height:       24,
		scrollOffset: 0,
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
				m.scrollOffset = 0
			}
		case "right":
			if m.cursor < len(m.items)-1 {
				m.cursor++
				m.scrollOffset = 0
			}
		case "up":
			if m.scrollOffset > 0 {
				m.scrollOffset--
			}
		case "down":
			maxScroll := m.getMaxScroll()
			if m.scrollOffset < maxScroll {
				m.scrollOffset++
			}
		case "home":
			m.scrollOffset = 0
		case "end":
			m.scrollOffset = m.getMaxScroll()
		}
	}
	return m, nil
}

func (m menuModel) getMaxScroll() int {
	var fixedHeight int

	if m.width < 90 {
		fixedHeight = m.height - 6
	} else if m.width < 120 {
		fixedHeight = 28
	} else {
		fixedHeight = 30
	}

	if fixedHeight < 18 {
		fixedHeight = 18
	}

	content := m.getContent(70)
	contentLines := strings.Split(content, "\n")
	availableHeight := fixedHeight - 8

	if len(contentLines) <= availableHeight {
		return 0
	}
	return len(contentLines) - availableHeight
}

func (m menuModel) View() string {
	var fixedWidth, fixedHeight int

	if m.width < 90 {
		fixedWidth = 70
		fixedHeight = m.height - 6
	} else if m.width < 120 {
		fixedWidth = 85
		fixedHeight = 28
	} else {
		fixedWidth = 100
		fixedHeight = 30
	}

	if fixedWidth < 60 {
		fixedWidth = 60
	}
	if fixedHeight < 18 {
		fixedHeight = 18
	}

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
				Width(fixedWidth).
				Height(fixedHeight)

		footerStyle = lipgloss.NewStyle().
				Foreground(lipgloss.Color("#888888")).
				Align(lipgloss.Center).
				Width(fixedWidth - 4)

		centerStyle = lipgloss.NewStyle().
				Width(m.width).
				Height(m.height).
				Align(lipgloss.Center, lipgloss.Center)
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

	var spacing string
	if fixedWidth < 80 {
		spacing = strings.Repeat(" ", 2)
	} else if fixedWidth < 95 {
		spacing = strings.Repeat(" ", 5)
	} else {
		spacing = strings.Repeat(" ", 10)
	}

	header := lipgloss.JoinHorizontal(lipgloss.Left, title, spacing, navigation)

	content := m.getContent(fixedWidth)
	contentLines := strings.Split(content, "\n")

	availableHeight := fixedHeight - 8
	startLine := m.scrollOffset
	endLine := startLine + availableHeight

	if endLine > len(contentLines) {
		endLine = len(contentLines)
	}

	var visibleContent []string
	if startLine < len(contentLines) {
		visibleContent = contentLines[startLine:endLine]
	}

	scrolledContent := strings.Join(visibleContent, "\n")

	footerText := "Press 'q' to quit | ←→ menu | ↑↓ scroll"
	footer := footerStyle.Render(footerText)

	body := lipgloss.JoinVertical(lipgloss.Left,
		header,
		strings.Repeat("-", fixedWidth-4),
		scrolledContent,
		"",
		footer,
	)

	borderedContent := borderStyle.Render(body)

	return centerStyle.Render(borderedContent)
}

func arrangeSkillBoxes(skills []string, skillBoxStyle lipgloss.Style, containerWidth int) string {
	if len(skills) == 0 {
		return ""
	}

	boxesPerRow := containerWidth / 15
	if boxesPerRow < 1 {
		boxesPerRow = 1
	}
	if boxesPerRow > len(skills) {
		boxesPerRow = len(skills)
	}

	var rows []string
	for i := 0; i < len(skills); i += boxesPerRow {
		end := i + boxesPerRow
		if end > len(skills) {
			end = len(skills)
		}

		var rowBoxes []string
		for j := i; j < end; j++ {
			rowBoxes = append(rowBoxes, skillBoxStyle.Render(skills[j]))
		}

		row := lipgloss.JoinHorizontal(lipgloss.Left, rowBoxes...)
		rows = append(rows, row)
	}

	return lipgloss.JoinVertical(lipgloss.Left, rows...)
}

func (m menuModel) getContent(fixedWidth int) string {
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

		bannerStyle = lipgloss.NewStyle().
				Foreground(lipgloss.Color("#FF6B35")).
				Align(lipgloss.Center).
				Bold(true)
	)

	switch m.cursor {
	case 0:
		responsiveBannerStyle := bannerStyle.Width(fixedWidth - 10)
		bannerText := responsiveBannerStyle.Render(banner.Banner())

		subtitleStyle := lipgloss.NewStyle().
			Foreground(lipgloss.Color("#FFFFFF")).
			Align(lipgloss.Center).
			Bold(true).
			Padding(1, 0).
			Width(fixedWidth - 10)

		subtitle := subtitleStyle.Render("21 | Developer")
		return lipgloss.JoinVertical(lipgloss.Center, bannerText, subtitle)

	case 1:
		aboutTitle := sectionTitleStyle.Render("# About Me")
		aboutText := "21 | Software Engineer. Explore the\nopen-source projects and libraries I maintain on GitHub"

		techTitle := sectionTitleStyle.Render("# Tools & Technologies")

		langTitle := lipgloss.NewStyle().Foreground(lipgloss.Color("#CCCCCC")).Bold(true).Render("## Languages")
		languages := []string{"Python", "C", "JavaScript", "TypeScript", "Go"}
		langRow := arrangeSkillBoxes(languages, skillBoxStyle, fixedWidth-10)

		fwTitle := lipgloss.NewStyle().Foreground(lipgloss.Color("#CCCCCC")).Bold(true).Render("## Frameworks & Libraries")
		frameworks := []string{"ReactJS", "NextJS", "ExpressJS", "Nest Js", "Gin", "GraphQL"}
		fwRow := arrangeSkillBoxes(frameworks, skillBoxStyle, fixedWidth-10)

		stateTitle := lipgloss.NewStyle().Foreground(lipgloss.Color("#CCCCCC")).Bold(true).Render("## State Management & Styling")
		stateTools := []string{"Zustand", "Recoil", "Tailwind CSS"}
		stateRow := arrangeSkillBoxes(stateTools, skillBoxStyle, fixedWidth-10)

		toolsTitle := lipgloss.NewStyle().Foreground(lipgloss.Color("#CCCCCC")).Bold(true).Render("## Development Tools")
		devTools := []string{"Git", "Jest", "Vitest"}
		devRow := arrangeSkillBoxes(devTools, skillBoxStyle, fixedWidth-10)

		dbTitle := lipgloss.NewStyle().Foreground(lipgloss.Color("#CCCCCC")).Bold(true).Render("## Databases & Cloud")
		databases := []string{"PostgreSQL", "Mongo DB", "Redis", "Supabase", "Prisma", "Drizzle"}
		dbRow := arrangeSkillBoxes(databases, skillBoxStyle, fixedWidth-10)

		monTitle := lipgloss.NewStyle().Foreground(lipgloss.Color("#CCCCCC")).Bold(true).Render("## Monitoring & Messaging")
		monitoring := []string{"Prometheus", "Grafana", "Kafka"}
		monRow := arrangeSkillBoxes(monitoring, skillBoxStyle, fixedWidth-10)

		devopsTitle := lipgloss.NewStyle().Foreground(lipgloss.Color("#CCCCCC")).Bold(true).Render("## DevOps")
		devopsTools := []string{"Docker", "Kubernetes", "CI/CD", "Nginx", "AWS EC2", "AWS S3", "AWS ECS"}
		devopsRow := arrangeSkillBoxes(devopsTools, skillBoxStyle, fixedWidth-10)

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
			stateTitle,
			stateRow,
			"",
			toolsTitle,
			devRow,
			"",
			dbTitle,
			dbRow,
			"",
			monTitle,
			monRow,
			"",
			devopsTitle,
			devopsRow,
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
