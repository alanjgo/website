import { useMemo, useState } from 'react'
import { usePostHog } from '@posthog/react'
import { Check, Copy, Minus, Plus } from 'lucide-react'
import { skills } from '../data/skills.generated'
import './Skills.css'

const skillsInstallCommandPrefix = 'npx skills add alanjgo/product-skills'

function getSkillInstallCommand(skill) {
    return `${skillsInstallCommandPrefix} ${skill.slug}`
}

export function Skills() {
    const displayedSkills = useMemo(() => skills, [])
    const [expandedSkillName, setExpandedSkillName] = useState(null)
    const [copiedTarget, setCopiedTarget] = useState(null)
    const posthog = usePostHog()

    const toggleSkill = (skill) => {
        const nextExpandedSkillName = expandedSkillName === skill.name ? null : skill.name

        setExpandedSkillName(nextExpandedSkillName)
        posthog?.capture('product_skill_toggled', {
            skill_name: skill.name,
            expanded: Boolean(nextExpandedSkillName),
        })
    }

    const copyText = async ({ skill, text, target, eventName }) => {
        const copyWithTextArea = () => {
            const textArea = document.createElement('textarea')
            textArea.value = text
            textArea.setAttribute('readonly', '')
            textArea.style.position = 'fixed'
            textArea.style.opacity = '0'
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
        }

        try {
            if (navigator.clipboard) {
                try {
                    await navigator.clipboard.writeText(text)
                } catch {
                    copyWithTextArea()
                }
            } else {
                copyWithTextArea()
            }

            const copiedTargetKey = `${skill.name}:${target}`

            setCopiedTarget(copiedTargetKey)
            window.setTimeout(() => setCopiedTarget(null), 1600)
            posthog?.capture(eventName, {
                skill_name: skill.name,
            })
        } catch {
            setCopiedTarget(null)
        }
    }

    const copyInstallCommand = (skill) => copyText({
        skill,
        text: getSkillInstallCommand(skill),
        target: 'install-command',
        eventName: 'product_skill_install_command_copied',
    })

    const copySkillMarkdown = (skill) => copyText({
        skill,
        text: skill.content,
        target: 'markdown',
        eventName: 'product_skill_markdown_copied',
    })

    return (
        <section className="skills-page" aria-label="Skills">
            <div className="skills-intro">
                <h1 className="skills-title">Skills for Product Managers</h1>
                <p className="skills-description">
                    Skills that I use daily.
                </p>
                <section className="skills-usage" aria-labelledby="skills-usage-title">
                    <h2 id="skills-usage-title" className="skills-usage-title">
                        How to use skills?
                    </h2>
                    <div className="skills-usage-content">
                        <p className="skills-usage-text">
                            Skills are a way to for coding agents (Claude Code, Codex, Cursor...) to follow rules without needing to re-enter the same instructions twice.
                        </p>
                        <p className="skills-usage-text">
                            To download these skills, you can run the terminal command for the skill you like. If you prefer, you can also copy/paste the content and ask your agent to create a skill with the content.
                        </p>
                    </div>
                </section>
            </div>

            <div className="skills-grid">
                {displayedSkills.map((skill) => {
                    const isExpanded = expandedSkillName === skill.name
                    const isInstallCommandCopied = copiedTarget === `${skill.name}:install-command`
                    const isMarkdownCopied = copiedTarget === `${skill.name}:markdown`
                    const panelId = `skill-panel-${skill.name}`
                    const installCommand = getSkillInstallCommand(skill)

                    return (
                        <article
                            key={skill.name}
                            className={`skill-card${isExpanded ? ' skill-card--expanded' : ''}`}
                        >
                            <div className="skill-heading">
                                <div className="skill-name-group">
                                    <div>
                                        <p className="skill-name">{skill.name}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="skill-toggle"
                                    aria-label={isExpanded ? `Masquer ${skill.name}` : `Afficher ${skill.name}`}
                                    aria-expanded={isExpanded}
                                    aria-controls={panelId}
                                    onClick={() => toggleSkill(skill)}
                                >
                                    {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                                </button>
                            </div>
                            <p className="skill-description">{skill.description}</p>

                            {isExpanded ? (
                                <div id={panelId} className="skill-panel">
                                    <div className="skill-install">
                                        <code>
                                            <span>npx&nbsp;</span>{installCommand.slice('npx '.length)}
                                        </code>
                                        <button
                                            type="button"
                                            className="skill-copy"
                                            aria-label={`Copier la commande ${skill.name}`}
                                            onClick={() => copyInstallCommand(skill)}
                                        >
                                            {isInstallCommandCopied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>

                                    <div className="skill-content-frame">
                                        <div className="skill-content-actions">
                                            <button
                                                type="button"
                                                className="skill-copy"
                                                aria-label={`Copier le markdown ${skill.name}`}
                                                onClick={() => copySkillMarkdown(skill)}
                                            >
                                                {isMarkdownCopied ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                        </div>

                                        <pre className="skill-content"><code>{skill.content}</code></pre>
                                    </div>
                                </div>
                            ) : null}
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
