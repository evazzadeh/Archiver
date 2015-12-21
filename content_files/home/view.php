<?php
namespace content_files\home;

class view extends \mvc\view
{
	public function config()
	{
		$this->include->js          = false;
		$this->include->css         = false;
		$this->include->fontawesome = true;
		$this->include->lightbox    = true;

		$this->data->bodyclass      = 'unselectable';

		$this->data->location       = $this->url('path', -1);

		if(count($this->data->location)>1 && $this->data->location[0] == '$')
		{
			switch ($this->data->location[1])
			{
				case 'favorites':
					$this->data->datatable = $this->model()->draw_favorites();
					// var_dump($this->data->datatable);
					break;

				case 'search':
					$this->data->datatable = $this->model()->draw_search();
					// var_dump($this->data->datatable);
					break;

				case 'tags':
					$this->data->tagstable = $this->model()->draw_tags();
					// var_dump($this->data->tagstable);
					break;

				case 'result':
					$appAuthCode = \lib\utility::get('authcode');
					$appResult   = \lib\utility::get('result');
					$this->data->appResult =
					[
						T_('AuthCode') => $appAuthCode,
						T_('Result') => $appResult,
					];
					// $appPost = \lib\utility::post();

					if( $appAuthCode && $appResult)
					{
						// read get and show in modal
						for ($i=1; $i <= 5; $i++)
						{
							$appKey   = \lib\utility::get('key'.$i);
							$appValue = \lib\utility::get('value'.$i);
							if($appKey && $appValue)
							{
								$this->data->appResult[$appKey] = $appValue;
							}
						}
					}

					// var_dump($this->data->appResult);
					break;

				default:
					$this->data->datatable = array();
					break;
			}
		}
		else
		{
			$this->data->datatable = $this->model()->draw();
		}
		// datatable has no item
		if(!isset($this->data->datatable) || count($this->data->datatable) == 0)
		{
			// on home page we have no file, show intro
			if(count($this->data->location) == 0)
			{
				$this->data->bodyclass = $this->data->bodyclass . ' first-time';
			}

			$this->data->bodyclass = $this->data->bodyclass . ' empty';
		}


		$this->data->site['title']  = T_("Archiver");
		$this->data->site['desc']   = T_("Archiver is new");
		$this->data->site['slogan'] = T_("Ermile is our company");
		$this->data->dir['right']   = $this->global->direction == 'rtl'? 'left':  'right';
		$this->data->dir['left']    = $this->global->direction == 'rtl'? 'right': 'left';

		$this->data->page['desc']   = T_("Archiver is another archive system!");

		$this->data->maxSize = \lib\utility\Upload::max_file_upload_in_bytes();

	}
}
?>