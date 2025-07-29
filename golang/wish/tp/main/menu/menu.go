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

	content := m.getContent(fixedWidth)
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

		projectHeadingStyle := lipgloss.NewStyle().
			Foreground(lipgloss.Color("#FF6B35")).
			Bold(true).
			Padding(0, 0, 0, 0)

		projectDescStyle := lipgloss.NewStyle().
			Foreground(lipgloss.Color("#CCCCCC")).
			Padding(0, 0, 1, 0)

		techLabelStyle := lipgloss.NewStyle().
			Foreground(lipgloss.Color("#AAAAAA")).
			Italic(true)

		project1Title := projectHeadingStyle.Render("## Terminal Portfolio")
		project1Desc := projectDescStyle.Render("Interactive SSH-based portfolio application built with modern terminal UI")
		project1TechLabel := techLabelStyle.Render("Technologies:")
		project1Tech := []string{"Go", "Wish", "Bubbletea", "Lipgloss", "SSH"}
		project1TechRow := arrangeSkillBoxes(project1Tech, skillBoxStyle, fixedWidth-10)

		project2Title := projectHeadingStyle.Render("## AI PPT Generator")
		project2Desc := projectDescStyle.Render("AI-powered presentation generator with modern web interface and backend processing")
		project2TechLabel := techLabelStyle.Render("Technologies:")
		project2Tech := []string{"Next.js", "TypeScript", "Go", "Redis", "PostgreSQL", "Prisma", "Gemini AI", "Pub Sub", "Node.js"}
		project2TechRow := arrangeSkillBoxes(project2Tech, skillBoxStyle, fixedWidth-10)

		project3Title := projectHeadingStyle.Render("## Adda AI")
		project3Desc := projectDescStyle.Render("Full-stack AI chat application enabling conversations with AI characters")
		project3TechLabel := techLabelStyle.Render("Technologies:")
		project3Tech := []string{"React", "Next.js", "Nest.js", "Docker", "PostgreSQL", "Prisma", "Turborepo"}
		project3TechRow := arrangeSkillBoxes(project3Tech, skillBoxStyle, fixedWidth-10)

		project4Title := projectHeadingStyle.Render("## Real-time Chat")
		project4Desc := projectDescStyle.Render("WebSocket-based chat application with pub/sub messaging architecture")
		project4TechLabel := techLabelStyle.Render("Technologies:")
		project4Tech := []string{"WebSocket", "Redis", "Pub/Sub", "Node.js", "React"}
		project4TechRow := arrangeSkillBoxes(project4Tech, skillBoxStyle, fixedWidth-10)

		return contentStyle.Render(lipgloss.JoinVertical(lipgloss.Left,
			projectTitle,
			"",
			project1Title,
			project1Desc,
			project1TechLabel,
			project1TechRow,
			"",
			project2Title,
			project2Desc,
			project2TechLabel,
			project2TechRow,
			"",
			project3Title,
			project3Desc,
			project3TechLabel,
			project3TechRow,
			"",
			project4Title,
			project4Desc,
			project4TechLabel,
			project4TechRow,
		))

	case 3:
		contactTitle := sectionTitleStyle.Render("# Get In Touch")

		contactHeadingStyle := lipgloss.NewStyle().
			Foreground(lipgloss.Color("#FF6B35")).
			Bold(true).
			Padding(0, 0, 0, 0)

		contactItemStyle := lipgloss.NewStyle().
			Border(lipgloss.RoundedBorder()).
			BorderForeground(lipgloss.Color("#FF6B35")).
			Padding(1, 2).
			Margin(0, 1, 1, 0).
			Foreground(lipgloss.Color("#FFFFFF")).
			Width(fixedWidth/2 - 8)

		contactLabelStyle := lipgloss.NewStyle().
			Foreground(lipgloss.Color("#FF6B35")).
			Bold(true)

		contactValueStyle := lipgloss.NewStyle().
			Foreground(lipgloss.Color("#CCCCCC")).
			Padding(0, 0, 0, 1)

		callToActionStyle := lipgloss.NewStyle().
			Foreground(lipgloss.Color("#FFFFFF")).
			Background(lipgloss.Color("#FF6B35")).
			Padding(1, 2).
			Margin(1, 0).
			Bold(true).
			Align(lipgloss.Center).
			Width(fixedWidth - 10)

		emailCard := contactItemStyle.Render(
			lipgloss.JoinVertical(lipgloss.Left,
				contactLabelStyle.Render("Email"),
				contactValueStyle.Render("workforrudra24@gmail.com"),
			),
		)

		githubCard := contactItemStyle.Render(
			lipgloss.JoinVertical(lipgloss.Left,
				contactLabelStyle.Render("GitHub"),
				contactValueStyle.Render("Rudra-Sankha-Sinhamahapatra"),
			),
		)

		linkedinCard := contactItemStyle.Render(
			lipgloss.JoinVertical(lipgloss.Left,
				contactLabelStyle.Render("LinkedIn"),
				contactValueStyle.Render("https://www.linkedin.com/in/rudra-sankha-sinhamahapatra-6311aa1bb/"),
			),
		)

		twitterCard := contactItemStyle.Render(
			lipgloss.JoinVertical(lipgloss.Left,
				contactLabelStyle.Render("Twitter"),
				contactValueStyle.Render("@RudraSankha"),
			),
		)

		var contactRows []string
		if fixedWidth >= 80 {
			row1 := lipgloss.JoinHorizontal(lipgloss.Left, emailCard, githubCard)
			row2 := lipgloss.JoinHorizontal(lipgloss.Left, linkedinCard, twitterCard)
			contactRows = []string{row1, row2}
		} else {
			contactRows = []string{emailCard, githubCard, linkedinCard, twitterCard}
		}

		availabilityTitle := contactHeadingStyle.Render("## Current Status")
		availabilityText := lipgloss.NewStyle().
			Foreground(lipgloss.Color("#90EE90")).
			Bold(true).
			Render("Open to opportunities")

		responseTitle := contactHeadingStyle.Render("## Response Time")
		responseText := contactValueStyle.Render("Usually respond within 24 hours")

		callToAction := callToActionStyle.Render("»  Feel free to reach out if you are hiring or just to say hi!")

		contactElements := []string{
			contactTitle,
			"",
		}

		contactElements = append(contactElements, contactRows...)

		contactElements = append(contactElements,
			"",
			availabilityTitle,
			availabilityText,
			"",
			responseTitle,
			responseText,
			"",
			callToAction,
		)

		return contentStyle.Render(lipgloss.JoinVertical(lipgloss.Left, contactElements...))

	default:
		return contentStyle.Render("Select a menu item to view content.")
	}
}
