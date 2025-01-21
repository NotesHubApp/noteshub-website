import { Announcement } from 'models/Announcement'
import { ArrowCircleRightIcon } from 'components/icons';
import Link from 'next/link';
import { ProductHuntAnnouncementBadge } from 'components/common/ProductHuntAnnouncementBadge';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    alignSelf: 'center',
    margin: '20px'
  },
  announcementContainer: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    padding: '5px 7px',
    borderRadius: '9999px',
    borderColor: 'var(--divider-color)',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'gray',
    margin: '20px',

    '& svg': {
      width: '14px',
      height: '14px'
    },

    '&:hover': {
      borderColor: 'gray'
    }
  },
  announcementIndicator: {
    borderRadius: '100%',
    backgroundColor: 'var(--theme-color)',
    width: '8px',
    height: '8px'
  },
  announcementText: {
    fontSize: '80%',
    maxWidth: '250px',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
})


type AnnouncementBadgeProps = {
  announcement?: Announcement
}

export function AnnouncementBadge({ announcement }: AnnouncementBadgeProps) {
  const classes = useStyles();

  if (announcement) {
    switch (announcement.type) {
      case 'post':
        return (
          <Link className={ classes.announcementContainer } href={ announcement.url }>
            <div className={ classes.announcementIndicator } />
            <span className={ classes.announcementText }>{ announcement.title }</span>
            <ArrowCircleRightIcon />
          </Link>
        )

      case 'externalLink':
        return (
          <Link className={ classes.announcementContainer } href={ announcement.url } target="_blank" rel="noopener">
            <div className={ classes.announcementIndicator } />
            <span className={ classes.announcementText }>{ announcement.title }</span>
            <ArrowCircleRightIcon />
          </Link>
        )

      case 'productHunt':
        return (
          <ProductHuntAnnouncementBadge
            postId={ announcement.postId }
            postSlug={ announcement.postSlug }
            className={ classes.container }
          />
        )
    }
  }

  return null;
}
