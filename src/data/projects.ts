import type { ProjectData } from '@/types'

export const projectData: ProjectData = [
  {
    title: 'Personal Projects',
    projects: [
      {
        text: 'Safe-pass',
        description: 'A Go CLI tool for handling password management. (Redis, Cobra CLI) ',
        icon: 'i-carbon-key', // you can pick an appropriate icon
        href: 'https://github.com/abanoub-samy-farhan/safe-pass',
      },
      {
        text: 'CoLearn',
        description: 'AI-powered learning management system tailored for Egyptian high school students. Forked project. ',
        icon: 'i-carbon-education',
        href: 'https://github.com/abanoub-samy-farhan/Co-Learn',
      },
      {
        text: 'AirBnB Clone',
        description: 'AirBnB clone project (various versions) as part of ALX curriculum work. ',
        icon: 'i-carbon-home',
        href: 'https://github.com/abanoub-samy-farhan/AirBnB_clone_v4', // or whichever version you want to highlight
      },
      {
        text: 'Real-time Reviews Analysis',
        description: 'Product reviews analysis via real-time scraping & ML (Aspect-based sentiment summarization).',
        icon: 'i-carbon-data-analysis',
        href: 'https://github.com/abanoub-samy-farhan/real-time-reviews-analysis',
      },
    ],
  },
  {
    title: 'Open Source Contributions',
    projects: [{
      text: 'AboutCode - Scancode.io',
      description: 'A tool for analyzing and improving open source projects.',
      icon: 'i-carbon-data-analysis',
      href: 'https://github.com/abanoub-samy-farhan/scancode.io',
    }],
  },
]
